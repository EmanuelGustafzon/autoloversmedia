import React from 'react'
import { Media, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Avatar from "../../components/Avatar";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Comment.module.css'
import { axiosRes } from '../../api/axiosDefaults';


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
      setComments } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

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
                ? { ...Comment, commentlikes_count: comment.commentlikes_count - 1, commentlike_id: null }
                : comment;
            }),
          }));
        } catch (err) {
          console.log(err);
        }
      };
    
  return (
    <div>
        <hr/>
        <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} />
        </Link>
        <Media.Body className="align-self-center ml-2">
        <span className={styles.Owner}>{owner}</span>
        <span className={styles.Date}>{updated_on}</span>
        <p>{content}</p>

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
        </Media>
    </div>
  )
}

export default Comment