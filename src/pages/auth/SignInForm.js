import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

function SignInForm() {

const setCurrentUser = useSetCurrentUser();

const [signInData, setSignInData] = useState({
    username: '',
    password: '',
});

const handleChange = (event) =>{
    setSignInData({
    ...signInData,
    [event.target.name]: event.target.value,
  });
};
const {username, password} = signInData;
const [errors, setErrors] = useState({});
const history = useHistory();
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post('dj-rest-auth/login/', signInData)
      setCurrentUser(data.user)
      history.push('/')
    } catch(err){
      setErrors(err.response?.data)
    }
  };
  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>


          <Form onSubmit={handleSubmit}>
  <Form.Group className={styles.Input} controlId="username">
        <Form.Label className="d-none">username</Form.Label>
        <Form.Control 
          type="test" 
          placeholder="Username" 
          name="username"  
          value={username}
          onChange={handleChange} 
          />
  </Form.Group>
  {errors.username?.map((message, idx) =>
  <Alert variant='warning' key={idx}>{message}</Alert>)}

  <Form.Group className={styles.Input}
    controlId="password">
        <Form.Label className="d-none" >Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password" 
        name="password" 
        value={password}
        onChange={handleChange} 
        />
  </Form.Group>
  {errors.password?.map((message, idx) =>
  <Alert variant='warning' key={idx}>{message}</Alert>)}

<Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles}`} type="submit">
    Sign in
  </Button>
  {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
                          ))}
</Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://res.cloudinary.com/dl535zny9/image/upload/v1663271900/pexels-alfonso-escalante-2558872_cawfp7.jpg"}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;