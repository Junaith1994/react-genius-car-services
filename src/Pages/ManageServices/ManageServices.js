import React from 'react';
import useServices from '../useServices/useServices';

const ManageServices = () => {
    const [services, setServices] = useServices();

    const handleDelete = id => {
        const proceed = window.confirm("Are sure, you want to delete ?")
        const url = `https://genius-car-services-server-2etrtww8e.vercel.app/service/${id}`;
        proceed && fetch(url, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0) {
                const remaining = services.filter(service => service._id !== id);
                setServices(remaining);
            }
            console.log(data);
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h1>Manage your services</h1>
            {
                services.map(service => <h3 key={service._id}>{service.name}<button onClick={() => handleDelete(service._id)}>X</button></h3>)
            }
        </div>
    );
};

export default ManageServices;