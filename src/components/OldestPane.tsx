import React from 'react';
import ListPane from './ListPane';
import { TodoItem } from '../model';

interface OldestPaneProps {
    items: TodoItem[];
    isChecked: (id: number) => boolean;
    onCheck: (id: number) => void;
}

const OldestPane: React.FC<OldestPaneProps> = ({ items, isChecked, onCheck }) => {
    const sortedItems = [...items].sort((a, b) => {
        const dateA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
        const dateB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
        return dateA - dateB; // Sort by ascending deadline
    });

    return (
        <ListPane
            eventKey="oldest-pane"
            items={sortedItems}
            isChecked={isChecked}
            onCheck={onCheck}
        />
    );
};

export default OldestPane;
