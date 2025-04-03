import React from 'react';
import { Tab, ListGroup } from 'react-bootstrap';
import ListItem from './ListItem';
import { TodoItem } from '../model';

interface NewestPaneProps {
    items: TodoItem[];
    isChecked: (id: number) => boolean; 
    onCheck: (id: number) => void; 
}

const NewestPane: React.FC<NewestPaneProps> = ({ items, isChecked, onCheck }) => {
    const sortedItems = [...items].sort((a, b) => {
        const dateA = a.deadline ? new Date(a.deadline).getTime() : 0;
        const dateB = b.deadline ? new Date(b.deadline).getTime() : 0;
        return dateB - dateA; // Sort by descending deadline
    });

    console.log('Rendering NewestPane');

    return (
        <Tab.Pane eventKey="newest-pane" id="newest-pane">
            <ListGroup id="newest-content" variant="flush">
                {sortedItems.map((item) => (
                    <ListItem
                        key={item.id}
                        item={item} // Pass the entire TodoItem object
                        isChecked={isChecked(item.id)} // Pass the isChecked prop
                        onCheck={onCheck} // Pass the onCheck callback
                    />
                ))}
            </ListGroup>
        </Tab.Pane>
    );
};

export default NewestPane;
