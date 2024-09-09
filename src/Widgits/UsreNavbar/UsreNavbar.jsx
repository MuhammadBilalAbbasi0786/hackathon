import React from 'react';
import { Navbar, Nav, NavDropdown, NavbarBrand, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import About from '../../Component/About';
// import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../Assets/logo.png'
import './style.css'

function UserNavbar() {
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
                        <Nav.Link as={Link} className='nav-link' to="/userpanel" >Home</Nav.Link>
                        <Nav.Link as={Link} className='nav-link' to="/ourjobs">OurJobs</Nav.Link>
                        <Nav.Link as={Link} className='nav-link' to="/profile">Profile</Nav.Link>
                        <Nav.Link as={Link} className='nav-link' to="/eventuser">Event</Nav.Link>
                    </Nav>

                    {/* Buttons on the right */}
                    <div className="d-flex">
                            <Link to="/profile" className="button-link">
                                View Profile
                            </Link>
                            <Link to="/joinngevet" className="button-link">
                               Our Event
                            </Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            </div>
        </div>
    );
}

export default UserNavbar;
