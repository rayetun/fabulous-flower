import React, { useContext } from 'react';
import { Button, Container, Row, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logoBlack.png';
import './HeaderBlack.css';
import { UserContext } from '../../App';

const HeaderBlack = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Container className="header">
            <Row>
                <div className="col">
                    <Navbar sticky="true" className="customNavBar">
                        <Navbar.Brand href="/">
                            <h3>Fabulous Flower</h3>
                        </Navbar.Brand>
                        <Nav className="ml-auto customNav">
                            <Link to="/">Home</Link>
                            <Link to="/admin">Admin</Link>
                            <Link to="/order">Order</Link>
                            <Link to="#">{loggedInUser.displayName}</Link>
                            <Link to={`/login`}>
                                {
                                    loggedInUser.email ? <Button className="customButton" onClick={() => setLoggedInUser({})}>Log Out</Button>
                                        : <Button className="customButton" >Login</Button>
                                }
                            </Link>
                        </Nav>
                    </Navbar>
                </div>
            </Row>
        </Container>
    );
};

export default HeaderBlack;