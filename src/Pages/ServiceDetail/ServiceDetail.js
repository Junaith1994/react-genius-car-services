import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useServiceDetail from '../hooks/useServiceDetail';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [service] = useServiceDetail(serviceId);

    return (
        <div>
            <h1>Service Detail Of {service.name}</h1>
            <div className='text-center'>
                <button className='btn btn-primary' onClick={() => navigate(`/checkout/${serviceId}`)}>Proceed Checkout</button>
            </div>
        </div>
    );
};

export default ServiceDetail;