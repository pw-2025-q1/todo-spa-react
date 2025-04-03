import React from 'react';
import ListPane from './ListPane';
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

    return (
        <ListPane
            eventKey="newest-pane"
            items={sortedItems}
            isChecked={isChecked}
            onCheck={onCheck}
        />
    );
};

export default NewestPane;
