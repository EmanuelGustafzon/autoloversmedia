import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/ReviewCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Assets";
import { Image } from "react-bootstrap";

function ReviewCreateForm() {

  const [errors, setErrors] = useState({});

  const [ReviewData, setReviewData] = useState({
    brand: '',
    image: '',
    model: '',
    model_year: '',
    pros: '',
    cons: '',
  })
  const { brand, image, model, model_year, pros, cons } = ReviewData;

  const handleChange = (event) => {
    setReviewData({
      ...ReviewData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setReviewData({
        ...ReviewData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const textFields = (
    <div className="text-center">

      <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={brand}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={model}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
           <Form.Group>
              <Form.Label>model year</Form.Label>
              <Form.Control
                type="text"
                name="model_year"
                value={model_year}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pros</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="pros"
                value={pros}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cons</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="cons"
                value={cons}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={5} lg={4}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={7} lg={8} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ReviewCreateForm;