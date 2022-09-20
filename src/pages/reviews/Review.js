import React from 'react'
import styles from'../../styles/Review.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from '../../api/axiosDefaults';

const Review = (props) => {

  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    brand,
    model,
    model_year,
    pros,
    cons,
    image,
    updated_on,
    ReviewPage,
    setReviews,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner
  
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { review: id });
      setReviews((prevReview) => ({
        ...prevReview,
        results: prevReview.results.map((review) => {
          return review.id === id
            ? { ...review, likes_count: review.likes_count + 1, like_id: data.id }
            : review;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setReviews((prevReview) => ({
        ...prevReview,
        results: prevReview.results.map((review) => {
          return review.id === id
            ? { ...review, likes_count: review.likes_count - 1, like_id: null }
            : review;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Review}>
    <Card.Body>
      <Media className="align-items-center justify-content-between">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} />
          {owner}
        </Link>
        <div className="d-flex align-items-center">
          <span>{updated_on}</span>
          {is_owner && ReviewPage && "..."}
        </div>
      </Media>
    </Card.Body>

    <Link to={`/review/${id}`}>
      <Card.Img src={image} alt={brand} />
    </Link>
    <Card.Body>
      <div className='row'>
        <div className='col-4'>
      Brand:{brand && <Card.Title className="text-center">{brand}</Card.Title>}
      </div>
      <div className='col-4'>
      Model:{model && <Card.Title>{model}</Card.Title>}
      </div>
      <div className='col-4'>
      Year:{model_year && <Card.Title>{model_year}</Card.Title>}
      </div>
      </div>

      Pros:{pros && <Card.Text>{pros}</Card.Text>}
      Cons:{cons && <Card.Text>{cons}</Card.Text>}
      <div className={styles.PostBar}>
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't like your own post!</Tooltip>}
          >
            <i className="far fa-heart" />
          </OverlayTrigger>
        ) : like_id ? (
          <span onClick={handleUnlike}>
            <i className={`fas fa-heart ${styles.Heart}`} />
          </span>
        ) : currentUser ? (

          <span onClick={handleLike}>
            <i className={`far fa-heart ${styles.HeartOutline}`} />
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Log in to like posts!</Tooltip>}
          >
            <i className="far fa-heart" />
          </OverlayTrigger>
        )}
        {likes_count}
        <Link to={`/review/${id}`}>
          <i className="far fa-comments" />
        </Link>
        {comments_count}
      </div>
    </Card.Body>
  </Card>
);
};


export default Review