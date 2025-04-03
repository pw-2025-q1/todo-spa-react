import React from 'react';
import { Nav } from 'react-bootstrap';
import {Link} from 'react-router';

const NavTabs: React.FC = () => {
    return (
        <Nav variant="tabs" className="flex-row">
            <Nav.Item>
                <Nav.Link eventKey="newest-pane" as={Link} to="/newest">
                    <h6>Newest</h6>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="oldest-pane" as={Link} to="/oldest">
                    <h6>Oldest</h6>
                </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
                <Nav.Link eventKey="tags-pane" as={Link} to="/tags">
                    <h6>Tags</h6>
                </Nav.Link>
            </Nav.Item> */}
        </Nav>
    );
};

export default NavTabs;
