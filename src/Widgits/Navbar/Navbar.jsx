import React from 'react';
import { Navbar, Nav, NavDropdown, NavbarBrand, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import About from '../../Component/About';
// import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../Assets/logo.png'
import './style.css'

function MainNavbar() {
    return (
        <div className='main-nav'>
            <div className="max-width">
            <Navbar  expand="lg">
            <Container fluid>
                {/* Logo on the left */}
                <NavbarBrand ><img src={logo} alt="logo" className='navlog' /></NavbarBrand>

                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll">
                    {/* Links centered */}
                    <Nav className="mx-auto navstyle my-2 my-lg-0" navbarScroll >
                        <Nav.Link as={Link} className='nav-link' to="/" >Home</Nav.Link>
                        <Nav.Link as={Link} className='nav-link' to="/about">About</Nav.Link>
                        <Nav.Link as={Link} className='nav-link' to="/pricing">Pricing</Nav.Link>
                        <Nav.Link as={Link} className='nav-link' to="/about">Projects</Nav.Link>
                    </Nav>

                    {/* Buttons on the right */}
                    <div className="d-flex">
                            <Link to="/signin" className="button-link">
                                Sign In
                            </Link>
                            <Link to="/signup" className="button-link">
                                Sign Up
                            </Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            </div>
        </div>
    );
}

export default MainNavbar;
