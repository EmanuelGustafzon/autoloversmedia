import React from 'react'
import styles from'../../styles/Review.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Market = (props) => {

  const {
    id,
    owner,
    profile_id,
    profile_image,
    country,
    city,
    brand,
    model,
    model_year,
    facilities,
    problems,
    description,
    price,
    phone,
    email,
    image,
    updated_on,
    MarketPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner
  const history = useHistory();

  const handleEdit = () => {
    history.push(`market/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/market/${id}/`);
      history.goBack();
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
          {is_owner && MarketPage && (
              <MoreDropdown
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              />
            )}
        </div>
      </Media>
    </Card.Body>

    <Link to={`/market/${id}`}>
      <Card.Img src={image} alt={brand} />
    </Link>
    <Card.Body>
      <div className='row'>
      <div className='col-4'>
      country:{country && <Card.Title className="text-center">{country}</Card.Title>}
      </div>
      <div className='col-4'>
      city:{city && <Card.Title className="text-center">{city}</Card.Title>}
      </div>
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

      Problems:{problems && <Card.Text>{problems}</Card.Text>}
      Description:{description && <Card.Text>{description}</Card.Text>}
      Facilities:{facilities && <Card.Text>{facilities}</Card.Text>}
      Price:{price && <Card.Text>{price}</Card.Text>}
      Phone:{phone && <Card.Text>{phone}</Card.Text>}
      Email:{email && <Card.Text>{email}</Card.Text>}
  
    </Card.Body>
  </Card>
);
};


export default Market