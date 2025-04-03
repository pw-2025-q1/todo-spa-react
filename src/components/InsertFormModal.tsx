import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { TodoItem } from '../model';

interface InsertFormModalProps {
    show: boolean;
    onHide: () => void; // Callback to close the modal
    onInsert: (item: TodoItem) => void; // Callback to notify parent of form submission
}

const InsertFormModal: React.FC<InsertFormModalProps> = ({ show, onHide, onInsert }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget); // use the Form Data API
        const description = formData.get('description') as string;
        const tags = (formData.get('tags') as string)?.split(',').map((tag) => tag.trim()) || [];
        const deadline = formData.get('deadline') as string;

        const newItem: TodoItem = {
            id: 0, // Temporary ID
            description,
            tags,
            deadline,
        };

        onInsert(newItem); // Notify parent with the new item
        onHide(); // Close the modal
    };

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Add New Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="item-form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            type="text"
                            placeholder="Describe your task"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            name="tags"
                            type="text"
                            placeholder="tag1, tag2, tag3"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="deadline">
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control name="deadline" type="date" />
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default InsertFormModal;
