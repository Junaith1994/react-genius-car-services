import React from 'react';
import './Service.css';
import { useNavigate } from 'react-router-dom';

const Service = ({ service }) => {
    const { _id, img, name, price, description } = service;
    const navigate = useNavigate();

    const navigateToDetails = id => {
        navigate(`/services/${id}`);
    }

    return (
        <div className='service-container'>
            <img src={img} alt="" />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Price: {price}</p>
            <button onClick={() => navigateToDetails(_id)} className='btn btn-primary'>Book {name}</button>
        </div>
    );
};

export default Service;