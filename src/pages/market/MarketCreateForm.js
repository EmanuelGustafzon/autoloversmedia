import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Assets";

import Upload from "../../assets/upload.png";

import styles from "../../styles/MarketReviewCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";


function MarketCreateForm() {
  useRedirect('loggedOut')
  const [errors, setErrors] = useState({});

  const [MarketData, setMarketData] = useState({
    country: '',
    city: '',
    brand: '',
    image: '',
    model: '',
    model_year: '',
    facilities: '',
    problems: '',
    description: '',
    price: '',
    phone: '',
    email: '',
  });
  const { country, city, brand, image, model, model_year, facilities, problems, description, price, phone, email } = MarketData;
  const imageInput = useRef();
  const history = useHistory();

  const handleChange = (event) => {
    setMarketData({
      ...MarketData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setMarketData({
        ...MarketData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('country', country)
    formData.append('city', city)
    formData.append('brand', brand)
    formData.append('image', imageInput.current.files[0])
    formData.append('model', model)
    formData.append('model_year', model_year)
    formData.append('facilities', facilities)
    formData.append('problems', problems)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('phone', phone)
    formData.append('email', email)
    try {
      const { data } = await axiosReq.post("/market/", formData);
      history.push(`/market/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data)
    }
  }
}
const textFields = (
    <div className="text-center">

<Form.Group>
              <Form.Label>country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={country}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.country?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

<Form.Group>
              <Form.Label>city</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={city}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.city?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      

      <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                as="select"
                name="brand"
                value={brand}
                className={styles.Input}
                onChange={handleChange}
                >
                <option value='Alfa Romeo'>Alfa Romeo</option>
                <option value='Alpina'>Alpina</option>
                <option value='Aston Martin'>Aston Martin</option>
                <option value='Audi'>Audi</option>
                <option value='Bentley'>Bentley</option>
                <option value='BMW'>BMW</option>
                <option value='Buick'>Buick</option>
                <option value='Cadillac'>Cadillac</option>
                <option value='Chevrolet'>Chevrolet</option>
                <option value='Chrysler'>Chrysler</option>
                <option value='Citroën'>Citroën</option>
                <option value='Cupra'>Cupra</option>
                <option value='Dacia'>Dacia</option>
                <option value='Dodge'>Dodge</option>
                <option value='DS'>DS</option>
                <option value='Ferrari'>Ferrari</option>
                <option value='Fiat'>Fiat</option>
                <option value='Ford'>Ford</option>
                <option value='GMC'>GMC</option>
                <option value='Honda'>Honda</option>
                <option value='Hummer'>Hummer</option>
                <option value='Hyundai'>Hyundai</option>
                <option value='Infiniti'>Infiniti</option>
                <option value='Jaguar'>Jaguar</option>
                <option value='Jeep'>Jeep</option>
                <option value='Kia'>Kia</option>
                <option value='Lamborghini'>Lamborghini</option>
                <option value='Lancia'>Lancia</option>
                <option value='Land Rover'>Land Rover</option>
                <option value='Lexus'>Lexus</option>
                <option value='Lincoln'>Lincoln</option>
                <option value='Lotus'>Lotus</option>
                <option value='Maserati'>Maserati</option>
                <option value='Maxus'>Maxus</option>
                <option value='Mazda'>Mazda</option>
                <option value='McLaren'>McLaren</option>
                <option value='Mercedes-Benz'>Mercedes-Benz</option>
                <option value='Mercury'>Mercury</option>
                <option value='MG'>MG</option>
                <option value='Mini'>Mini</option>
                <option value='Mitsubishi'>Mitsubishi</option>
                <option value='Nissan'>Nissan</option>
                <option value='Oldsmobile'>Oldsmobile</option>
                <option value='Opel'>Opel</option>
                <option value='Peugeot'>Peugeot</option>
                <option value='Plymouth'>Plymouth</option>
                <option value='Polestar'>Polestar</option>
                <option value='Pontiac'>Pontiac</option>
                <option value='Porsche'>Porsche</option>
                <option value='Renault'>Renault</option>
                <option value='Rolls-Royce'>Rolls-Royce</option>
                <option value='Rover/BMC'>Rover/BMC</option>
                <option value='Saab'>Saab</option>
                <option value='SEAT'>SEAT</option>
                <option value='Skoda'>Skoda</option>
                <option value='Smart'>Smart</option>
                <option value='Ssang Yong'>Ssang Yong</option>
                <option value='Subaru'>Subaru</option>
                <option value='Suzuki'>Suzuki</option>
                <option value='Tesla'>Tesla</option>
                <option value='Toyota'>Toyota</option>
                <option value='Volkswagen'>Volkswagen</option>
                <option value='Volvo'>Volvo</option>
              </Form.Control>
            </Form.Group>
            {errors?.brand?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      
      
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
            {errors?.model?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
            {errors?.model_year?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
            <Form.Group>
              <Form.Label>facilities</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="facilities"
                value={facilities}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.facilities?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
            <Form.Group>
              <Form.Label>Problems with the car</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="problems"
                value={problems}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.problems?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
<Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="description"
                value={description}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
<Form.Group>
              <Form.Label>Price in Euro</Form.Label>
              <Form.Control
                type='text'
                name="price"
                value={price}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.price?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
              <Form.Label>Phone number:</Form.Label>
              <Form.Control
                type='text'
                name="phone"
                value={phone}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.phone?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

<Form.Group>
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type='text'
                name="email"
                value={email}
                className={styles.Input}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.email?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
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
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

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

export default MarketCreateForm;
