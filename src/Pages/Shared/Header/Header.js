import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import logo from '../../../../src/images/Logo/logo.png';
import { Link } from 'react-router-dom';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase.init';

const Header = () => {
    // Firebase hook to receive currently signed-in user
    const [user, loading] = useAuthState(auth);
    console.log(user);

    // Firebase hook to sugn-out user
    const [signOut] = useSignOut(auth);

    return (
        <Navbar collapseOnSelect expand="lg" data-bs-theme="dark" sticky='top' className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/"><img src={logo} width={150} alt="Brand logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home#services">Services</Nav.Link>
                        <Nav.Link href="/home#experts">Experts</Nav.Link>
                        <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        {user &&
                            <>
                            <Nav.Link as={Link} to="/manage">Manage</Nav.Link>
                            <Nav.Link as={Link} to="/addservice">Add service</Nav.Link>
                            <Nav.Link as={Link} to="/order">Orders</Nav.Link>
                            </>
                        }
                        {user ?
                            <button onClick={() => signOut()} className='btn btn-light'>Sign-out</button>
                            : loading ? <button onClick={() => signOut()} className='btn btn-light'>Sign-out</button>
                                : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                        <h4 className='ms-2 text-primary'>{user?.email}</h4>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;