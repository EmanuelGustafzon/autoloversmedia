import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from'../assets/logo_auto.png';

const NavBar = () => {
  return (
    <Navbar fixed="top" expand="md">
    <Container>
    <Navbar.Brand><img src={logo} alt="logo" height="55" /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
      <Nav.Link>
              <i className="fas fa-home"></i>Home
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-sign-in-alt"></i>Sign in
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-user-plus"></i>Sign up
            </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar