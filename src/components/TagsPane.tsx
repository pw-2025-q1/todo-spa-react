import React from 'react';
import { Tab, ListGroup } from 'react-bootstrap';

const TagsPane: React.FC = () => {
    return (
        <Tab.Pane eventKey="tags-pane">
            <ListGroup id="tags-content" variant="flush"></ListGroup>
        </Tab.Pane>
    );
};

export default TagsPane;
