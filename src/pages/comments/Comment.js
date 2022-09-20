import React, { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import { Media, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Avatar from "../../components/Avatar";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Comment.module.css'
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';


const Comment = (props) => {
    const { 
      id, 
      commentlike_id, 
      commentlikes_count, 
      profile_id, 
      profile_image, 
      owner, 
      updated_on, 
      content,
      setReview,
      setComments } = props;

    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

    const handleDelete = async () => {
      try {
        await axiosRes.delete(`/comments/${id}/`);
        setReview(prevReview => ({
          results: [{
            ...prevReview.results[0],
            comments_count: prevReview.results[0].comments_count - 1
          }]
        })) 
        setComments(prevComments => ({
          ...prevComments,
          results: prevComments.results.filter(comment => comment.id !== id )
        }))
      } catch (err) {
        console.log(err);
      }
    };
    const handleLike = async () => {
        try {
          const { data } = await axiosRes.post("/commentlikes/", { comment: id });
          setComments((prevComment) => ({
            ...prevComment,
            results: prevComment.results.map((comment) => {
              return comment.id === id
                ? { ...comment, commentlikes_count: comment.commentlikes_count + 1, commentlike_id: data.id }
                : comment;
            }),
          }));

        } catch (err) {
          console.log(err);
        }
      };
      const handleUnlike = async () => {
        try {
          await axiosRes.delete(`/commentlikes/${commentlike_id}/`);
          setComments((prevComment) => ({
            ...prevComment,
            results: prevComment.results.map((comment) => {
              return comment.id === id
                ? { ...comment, commentlikes_count: comment.commentlikes_count - 1, commentlike_id: null }
                : comment;
            }),
          }));
        } catch (err) {
          console.log(err);
        }
      };
    
      return (
        <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_on}</span>
          {showEditForm ? (
            <CommentEditForm
      id={id}
      profile_id={profile_id}
      content={content}
      profileImage={profile_image}
      setComments={setComments}
      setShowEditForm={setShowEditForm}
    />
          ) : (
            <p>{content}</p>
          )}

        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't like your own post!</Tooltip>}
          >
            <i className="far fa-heart" />
          </OverlayTrigger>
        ) : commentlike_id ? (
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
            overlay={<Tooltip>Log in to like !</Tooltip>}
          >
            <i className="far fa-heart" />
          </OverlayTrigger>
        )}
        {commentlikes_count}

        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
}

export default Comment