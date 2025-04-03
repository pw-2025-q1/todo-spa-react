import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { TodoItem } from '../model';

interface InsertFormModalProps {
    show: boolean;
    onHide: () => void;
    onInsert: (item: TodoItem) => void; // Callback to notify parent of item insertion
}

const InsertFormModal: React.FC<InsertFormModalProps> = ({ show, onHide, onInsert }) => {
    const [formData, setFormData] = useState<TodoItem>({
        id: 0,
        description: '',
        tags: [],
        deadline: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onInsert(formData); // Notify parent with the new item
        onHide(); // Close the modal
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
        }));
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
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            name="tags"
                            type="text"
                            placeholder="tag1, tag2, tag3"
                            value={formData.tags?.join(', ')}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="deadline">
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control
                            name="deadline"
                            type="date"
                            value={formData.deadline}
                            onChange={handleChange}
                        />
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
