import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

function Navbar({ user }){
    return (
        <Nav>
        <div className="navbar">
            {user ? (
            <div className="navstyle">
                <div className="log">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/samplelogin">Sample Login</Nav.Link>
                    </Nav.Item>
                </div>
                <div className="log">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/lookup">Lookup Samples</Nav.Link>
                    </Nav.Item>
                </div>
                <div className="log">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/delete">Delete Sample</Nav.Link>
                    </Nav.Item>
                </div>
                <div className="log">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/overdue">Overdue List</Nav.Link>
                    </Nav.Item>
                </div>
                <div className="log">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/validate">Validate Samples</Nav.Link>
                    </Nav.Item>
                </div>
                <div className="log">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/reports">Reports</Nav.Link>
                    </Nav.Item>
                </div>
            </div>
        ) : (
            <div className="navstyle">
                <div className="log">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
                    </Nav.Item>
                </div>
                <div className="log">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/signin">Login</Nav.Link>
                    </Nav.Item>
                </div>
            </div>
        )}
        </div>
        </Nav>
        
    )
}

export default Navbar;