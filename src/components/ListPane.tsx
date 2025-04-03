import React from 'react';
import { Tab, ListGroup } from 'react-bootstrap';
import ListItem from './ListItem';
import { TodoItem } from '../model';

interface ListPaneProps {
    eventKey: string;
    items: TodoItem[];
    isChecked: (id: number) => boolean;
    onCheck: (id: number) => void;
}

const ListPane: React.FC<ListPaneProps> = ({ eventKey, items, isChecked, onCheck }) => {
    return (
        <Tab.Pane eventKey={eventKey}>
            <ListGroup variant="flush">
                {items.map((item) => (
                    <ListItem
                        key={item.id}
                        item={item}
                        isChecked={isChecked(item.id)}
                        onCheck={onCheck}
                    />
                ))}
            </ListGroup>
        </Tab.Pane>
    );
};

export default ListPane;
