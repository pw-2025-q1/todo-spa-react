import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Toast } from 'react-bootstrap';
import Toolbar from './Toolbar';
import NewestPane from './NewestPane';
import OldestPane from './OldestPane';
import TagsPane from './TagsPane';
import NavTabs from './NavTabs';
import InsertFormModal from './InsertFormModal';
import { todoRepository, TodoItem } from '../model';
import { Navigate, Route, Routes } from 'react-router';

const Main: React.FC = () => {
    const [items, setItems] = useState<TodoItem[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [checkedItems, setCheckedItems] = useState<{ [id: number]: boolean }>({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const fetchItems = () => {
        console.log('Fetching items from repository...');
        todoRepository.list()
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                console.error('Failed to fetch items:', error);
                setToastMessage('Failed to fetch items from the repository.');
                setShowToast(true);
            });
    };

    useEffect(() => {
        fetchItems();
    }, [refresh]);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    const isChecked = (id: number): boolean => {
        return !!checkedItems[id];
    };

    const onCheck = (id: number): void => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleRemove = () => {
        const activeItems = items.filter((item) => isChecked(item.id));
        console.log('Checked items:', activeItems);

        Promise.all(
            activeItems.map((item) =>
                todoRepository.removeById(item.id.toString()).catch((error) => {
                    console.error(`Failed to remove item with id ${item.id}:`, error);
                    setToastMessage(`Failed to remove item with id ${item.id}.`);
                    setShowToast(true);
                })
            )
        ).then(() => {
            console.log('Checked items removed');
            setCheckedItems({});
            setToastMessage(`${activeItems.length} item(s) removed successfully.`);
            setShowToast(true);
            handleRefresh();
        });
    };

    const handleAddClick = () => {
        setShowModal(true);
    };

    const handleModalHide = () => {
        setShowModal(false);
    };    

    const handleInsert = (item: TodoItem) => {
        todoRepository.insert(item)
            .then(() => {
                console.log('Todo item inserted:', item);
                setToastMessage('New item added successfully.');
                setShowToast(true); // Show success toast
                handleRefresh(); // Trigger a refresh
            })
            .catch((error) => {
                console.error('Failed to insert todo item:', error);
                setToastMessage('Failed to add the new item.');
                setShowToast(true); // Show error toast
            });
    };

    return (
        <main className="pt-4 pb-5">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xs={10}>
                        <Tab.Container defaultActiveKey="newest-pane">
                            <NavTabs />
                            <Tab.Content className="px-0 py-3 border border-top-0 bg-white rounded-bottom shadow">
                                <Toolbar
                                    onRefresh={handleRefresh}
                                    onRemove={handleRemove}
                                    onAdd={handleAddClick}
                                />
                                <Routes>
                                    <Route path="/" element={<Navigate to="/newest" />} />
                                    <Route path="/newest" element={<NewestPane items={items} isChecked={isChecked} onCheck={onCheck} />} />
                                    <Route path="/oldest" element={<OldestPane items={items} isChecked={isChecked} onCheck={onCheck} />} />
                                </Routes>
                                <TagsPane />
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
            <InsertFormModal
                show={showModal}
                onHide={handleModalHide}
                onInsert={handleInsert} // Pass handleInsert to InsertFormModal
            />
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                className="position-fixed top-0 start-50 translate-middle-x m-3"
            >
                <Toast.Header>
                    <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </main>
    );
};

export default Main;
