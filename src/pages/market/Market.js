import React from 'react'
import styles from'../../styles/Market.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
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
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Market}>
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
        <Card.Title>Brand:</Card.Title>{brand && <Card.Text className="text-center">{brand}</Card.Text>}
      </div>
      <div className='col-4'>
      <Card.Title>Model:</Card.Title>{brand && <Card.Text className="text-center">{model}</Card.Text>}
      </div>
      <div className='col-4'>
      <Card.Title>Year:</Card.Title>{brand && <Card.Text className="text-center">{model_year}</Card.Text>}
      </div>
      <div className='col-6'>
      <Card.Title>country:</Card.Title>{brand && <Card.Text className="text-center">{country}</Card.Text>}
      </div>
      <div className='col-6'>
      <Card.Title>City:</Card.Title>{brand && <Card.Text className="text-center">{city}</Card.Text>}
      </div>
      </div>
            <hr/>
      <Card.Title>Brand:</Card.Title>{problems && <Card.Text>{problems}</Card.Text>}
      <Card.Title>Description:</Card.Title>{description && <Card.Text>{description}</Card.Text>}
      <Card.Title>Facilities:</Card.Title>{facilities && <Card.Text>{facilities}</Card.Text>}
      <hr/>
      <div className='row'>
      <div className='col-4'>
      <Card.Title>Price:</Card.Title>{price && <Card.Text>{price}</Card.Text>}
      </div>
      <div className='col-4'>
      <Card.Title>Phone:</Card.Title>{phone && <Card.Text>{phone}</Card.Text>}
      </div>
      <div className='col-4'>
      <Card.Title>Email:</Card.Title>{email && <Card.Text>{email}</Card.Text>}
      </div>
      </div>
    </Card.Body>
  </Card>
);
};


export default Market