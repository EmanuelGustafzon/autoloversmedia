import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Market from "./Market";
import PopularProfiles from "../profiles/PopularProfiles";

function MarketPage() {
  const { id } = useParams();
  const [market, setMarket] = useState({ results: [] });


  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: market }]  = await Promise.all([
          axiosReq.get(`/market/${id}`),
        ]);
        setMarket({ results: [market] });
        console.log(market);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <PopularProfiles mobile />
        <Market {...market.results[0]} setMarket={setMarket} MarketPage />
       
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      <PopularProfiles />
      </Col>
    </Row>
  );
}

export default MarketPage;