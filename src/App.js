import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ReviewCreateForm from "./pages/reviews/ReviewCreateForm";
import MarketCreateForm from "./pages/market/MarketCreateForm";
import ReviewPage from "./pages/reviews/ReviewPage";
import ReviewsPage from "./pages/reviews/ReviewsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ReviewEditForm from "./pages/reviews/ReviewEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Main}>
        <Switch>
        <Route
            exact
            path="/"
            render={() => (
              <ReviewsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/reviewsfeed"
            render={() => (
              <ReviewsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/favorites"
            render={() => (
              <ReviewsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_on&`}
              />
            )}
          />
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm/>} />
          <Route exact path="/signup" render={() => <SignUpForm/>} />
          <Route exact path="/review/create" render={() => <ReviewCreateForm/>} />
          <Route exact path="/review/review/:id/edit" render={() => <ReviewEditForm/>} />
          <Route exact path="/review/:id" render={() => <ReviewPage />} />
          <Route exact path="/reviewsfeed" render={() => <ReviewsPage message='No results found. Adjust the search keyword' />} />
          <Route exact path="/market/create" render={() => <MarketCreateForm/>} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage/>} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />}/>
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />}/>
          <Route render={() => <h2>Page not found!</h2>} />

        </Switch>
      </Container>
    </div>
  );
};

export default App;