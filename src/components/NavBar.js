import React, { useContext } from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from'../assets/logo.auto.png';
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from '../App';

const NavBar = () => {
  const currentUser =  useContext(CurrentUserContext)
  const loggedInIcons = <>{currentUser?.username}</>
  const loggedOutIcons = (
  <> 
  <NavLink className={styles.NavLink} activeClassName="{styles.Active}" to="/signin">
  <i className="fas fa-sign-in-alt"></i>Sign in
</NavLink>
<NavLink className={styles.NavLink} activeClassName="{styles.Active}" to="/signup">
  <i className="fas fa-user-plus"></i>Sign up
</NavLink>
</>
  );
  return (
    <Navbar className={styles.NavBar} fixed="top" expand="md">
    <Container>
    <NavLink to="/">
    <Navbar.Brand><img src={logo} alt="logo" height="65" /></Navbar.Brand>
    </NavLink>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
            <NavLink className={styles.NavLink} activeClassName="{styles.Active}" to="/">
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>

  )
}

export default NavBar