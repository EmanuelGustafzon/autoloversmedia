import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Assets";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Review from "../reviews/Review";
import Market from "../market/Market";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";

import { ProfileEditDropdown } from "../../components/MoreDropdown";


function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileReviews, setProfileReviews] = useState({ results: [] });
  const [profileMarkets, setProfileMarkets] = useState({ results: [] });
  
  const currentUser = useCurrentUser();
  const { id } = useParams();

  const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();
  
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileReviews }, { data: profileMarkets }] = 
        await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/review/?owner__profile=${id}`),
          axiosReq.get(`/market/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileReviews(profileReviews);
        setProfileMarkets(profileMarkets);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.reviews_count}</div>
              <div>reviews</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} `}
                onClick={() => handleUnfollow(profile)}
                >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} `}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
       
        </Row>
              <hr/>
            <div><strong>Location: </strong>

            {profile?.location && profile.location}
            </div>
              <hr/>
            <div><strong>favorite car: </strong>

            {profile?.favorite_car_brand && profile.favorite_car_brand}
            </div>
              <hr/>
            <div><strong>Experience: </strong>

            {profile?.experience_with_cars && profile.experience_with_cars}
            </div>
            <hr/>

            <div><strong>About me: </strong>

            {profile?.description && profile.description}
            </div>
            <hr/>
  





    </>
  );

  const mainProfilePosts = (
    <>
    <hr />
      <p className="text-center">{profile?.owner}'s reviews and advertisments</p>
      <hr />
      {profileReviews.results.length ? (
        <InfiniteScroll
          children={profileReviews.results.map((review) => (
            <Review key={review.id} {...review} setReviews={setProfileReviews} />
          ))}
          dataLength={profileReviews.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileReviews.next}
          next={() => fetchMoreData(profileReviews, setProfileReviews)}
          />
      ) : ( 
        <Asset
        src={NoResults}
          message={`When ${profile?.owner} post a review it will display here.`}
        />
      )}
      {profileMarkets.results.length ? (
        <InfiniteScroll
          children={profileMarkets.results.map((market) => (
            <Market key={market.id} {...market} setMarkets={setProfileMarkets} />
          ))}
          dataLength={profileMarkets.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileMarkets.next}
          next={() => fetchMoreData(profileMarkets, setProfileMarkets)}
          />
      ) : ( 
        <Asset
          src={NoResults}
          message={`When ${profile?.owner} is adding a car to the market it will display here.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;