import { Tab, ListGroup } from 'react-bootstrap';
import ListItem from './ListItem';
import { TodoItem } from '../model';

interface OldestPaneProps {
    items: TodoItem[];
    isChecked: (id: number) => boolean; 
    onCheck: (id: number) => void; 
}

const OldestPane: React.FC<OldestPaneProps> = ({ items, isChecked, onCheck }) => {
    const sortedItems = items.sort((a, b) => {
        const dateA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
        const dateB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
        return dateA - dateB; // Sort by ascending deadline
    });

    console.log('Rendering OldestPane');

    return (
        <Tab.Pane eventKey="oldest-pane" id="oldest-pane">
            <ListGroup id="oldest-content" variant="flush">
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

export default OldestPane;
