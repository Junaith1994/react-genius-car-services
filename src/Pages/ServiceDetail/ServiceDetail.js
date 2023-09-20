import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Service Detail: {serviceId}</h1>
            <div className='text-center'>
                <button className='btn btn-primary' onClick={() => navigate('/checkout')}>Proceed Checkout</button>
            </div>
        </div>
    );
};

export default ServiceDetail;