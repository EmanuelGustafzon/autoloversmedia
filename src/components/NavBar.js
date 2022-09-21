import React from 'react'
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import logo from'../assets/logo.auto.png';
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

const addPostIcon = <>
<NavDropdown  title={<span><i className="far fa-plus-square"></i></span>}  id="basic-nav-dropdown">
<NavDropdown.Item>
<NavLink
className={styles.NavLink}
to="/review/create"
>
<i className="far fa-plus-square"></i> Write review
</NavLink>
</NavDropdown.Item>
<NavDropdown.Item>
<NavLink
className={styles.NavLink}
to="/market/create">
  
  <i className="far fa-plus-square"></i>Sell car
</NavLink>
</NavDropdown.Item>
</NavDropdown>

</>
  





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
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="50" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}

        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
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
            <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/marketfeed"
      >
        <i className="fas fa-cart-arrow-down"></i>Market
      </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;