// NavigationBar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand href="/">Car Rental</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/models">Vehicle Models</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
