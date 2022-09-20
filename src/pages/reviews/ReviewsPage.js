import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Review from "./Review";
import Asset from "../../components/Assets";

import appStyles from "../../App.module.css";
import styles from "../../styles/ReviewsPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import { useLocation } from "react-router";




function ReviewsPage({message, filter=''}) {
  const [reviews, setReviews] = useState({results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const {pathname} = useLocation()

  const [query, setQuery] = useState("");
  useEffect(() => {
    const fetchReviews = async () => {
        try {
            const { data } = await axiosReq.get(`/review/?${filter}search=${query}`);
            setReviews(data)
            setHasLoaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchReviews();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        <i>className={`fas fa-search ${styles.SearchIcon}`}</i>
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>
        {hasLoaded ? (
          <>
            {reviews.results.length ? (
              reviews.results.map((review) => (
                <Review key={review.id} {...review} setReviews={setReviews} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default ReviewsPage;