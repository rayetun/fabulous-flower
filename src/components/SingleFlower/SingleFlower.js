import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './SingleFlower.css'

const SingleFlower = (props) => {

    const {imageURL, name, color, price, _id} = props.flowers;
    const history = useHistory();
    const handleFlower = () => {
        history.push(`/checkout/${_id}`);
    }
    return (
        <div className="col-xl-3 col-lg-3 col-md-3 col-xs-12 my-5">
            <div className="single-flower">
                <div className="single-flower-image">
                    <img src={imageURL} alt={name} />
                </div>
                <div className="single-flower-details">
                    <h6>{name}</h6>
                    <h2>$ {price}</h2>
                    <Link to={`/checkout/${_id}`} onClick={handleFlower} className="buy-btn btn btn-primary">Buy Now</Link>
                </div>
            </div>
        </div>
    );
};

export default SingleFlower;