import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
  return (
    
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>
          <Form>
  <Form.Group className={styles.Input}
    controlId="username">
        <Form.Label className="d-none">username</Form.Label>
        <Form.Control type="test" placeholder="Username" name="username" />
  </Form.Group>

  <Form.Group className={styles.Input}
    controlId="password1">
        <Form.Label className="d-none" >Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password1" />
  </Form.Group>

  <Form.Group className={styles.Input}
    controlId="password2">
        <Form.Label className="d-none" >Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Confirm password" name="password2" />
  </Form.Group>

<Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles}`} type="submit">
    Sign Up
  </Button>
</Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://res.cloudinary.com/dl535zny9/image/upload/v1663170899/pexels-matheus-bertelli-799443_fwxszb.jpg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;