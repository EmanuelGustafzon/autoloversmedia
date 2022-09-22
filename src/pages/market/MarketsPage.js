import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Market from "./Market";
import Asset from "../../components/Assets";

import appStyles from "../../App.module.css";
import styles from "../../styles/SearchBar.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import { useLocation } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";



function MarketsPage({message, filter=''}) {
  const [markets, setMarkets] = useState({results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const {pathname} = useLocation()
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMarkets = async () => {
        try {
            const { data } = await axiosReq.get(`/market/?${filter}search=${query}`);
            setMarkets(data)
            setHasLoaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchMarkets();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile/>
        <i>className={`fas fa-search ${styles.SearchIcon}`}</i>
        <h2>Cars for sale</h2>
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
            {markets.results.length ? (
              <InfiniteScroll
              children={
                markets.results.map((market) => (
                  <Market key={market.id} {...market} setMarkets={setMarkets} />
                ))
              }
              dataLength={markets.results.length}
              loader={<Asset spinner/>}
              hasMore={!!markets.next}
              next={() => fetchMoreData(markets, setMarkets)}
              />

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
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default MarketsPage;