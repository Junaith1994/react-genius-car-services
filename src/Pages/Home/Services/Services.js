import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import './Services.css';
import useServices from '../../useServices/useServices';

const Services = () => {
    // Using custom hooks
    const [services] = useServices();

    return (
        <div id='services'>
            <h1 className='text-center text-primary mt-5'>Services: {services.length}</h1>
            <div className='services-container'>
                {
                    services.map(service => <Service
                        key={service._id}
                        service={service}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;