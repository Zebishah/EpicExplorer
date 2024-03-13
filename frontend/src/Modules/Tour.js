import React from 'react';
import { Link } from 'react-router-dom';
const Tour = ({ id, image, name, info, price, removeTour }) => {


    return (

        <article className="tour">
            <div className="img-container">
                <img src={image} alt={name} />
                <span className="close-btn" onClick={() => removeTour(id)}>
                    <i className="fas fa-times"></i>
                </span>
            </div>
            <div className="tour-info">
                <h4>{name}</h4>
                <h4 className="tour-price">${price}</h4>
            </div>
            <p>{info}</p>
            <Link to={'/Main'} className="bg-black text-yellow-400">Book</Link>


        </article>
    );
};

export default Tour;
