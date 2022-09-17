import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from'../assets/logo.auto.png';
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addReviewIcon = (
    <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/review/create"
  >
    <i className="far fa-plus-square"></i>Add review
  </NavLink>
  )
  const loggedInIcons = <>
        <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/reviewsfeed"
      >
        <i className="fas fa-stream"></i>Reviews
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/favorites"
      >
        <i className="fas fa-heart"></i>Favorites
      </NavLink>

      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i>Sign Out
      </NavLink>

      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
      <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
  </>;
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="65" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addReviewIcon}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;