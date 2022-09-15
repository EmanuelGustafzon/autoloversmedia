import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import {useState } from "react";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext } from "react";

export const CurrentUserContext = createContext()
export const setCurrentUserContext = createContext()

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <setCurrentUserContext.Provider value={setCurrentUser}>
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm/>} />
          <Route exact path="/signup" render={() => <SignUpForm/>} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
    </setCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;