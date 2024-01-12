import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckOut = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    // Example for understanding controlled field modification
    /* const [user, setUser] = useState({
        name: 'Junaith Bin Elias Khan',
        email: 'daya2018ctg@gmail.com',
        address: 'Barrister R/A, Chittagong',
        phone: '01627676315'
    })

    const inputHandler = event => {
        // console.log(event.target.value);
        const {phone, ...rest} = user;
        const newPhone = event.target.value;
        const newUser = {phone: newPhone, rest};
        setUser(newUser);
        console.log(user);
    } */

    const handleSubmit = event => {
        event.preventDefault();
        const order = {
            email: user.email || event.target.email.value,
            serviceId: serviceId,
            service: service.name,
            address: event.target.address.value,
            phone: event.target.phone.value,
        }
        // Posting Order to the server
        axios.post('https://genius-car-services-server-2etrtww8e.vercel.app/order', order)
            .then(response => {
                const {data} = response;
                if(data.insertedId) {
                    toast("Your booking is confirmed !!");
                    event.target.reset();
                }
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h1>Please Order For The Service : {service.name}</h1>
            <form onSubmit={handleSubmit} action="">
                <input className='w-100 mb-2' value={user?.displayName} type="text" name="name" id="" placeholder='Name' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' value={user?.email} type="email" name="email" id="" placeholder='Email' required />
                <br />
                <input className='w-100 mb-2' value={service.name} type="text" name="service" id="" placeholder='Service Name' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" name="address" id="" placeholder='Address' required autoComplete='off' />
                <br />
                <input className='w-100 mb-2' type="text" name="phone" id="" placeholder='Phone' required />
                <br />
                <input className='btn btn-primary fw-bold mb-2' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CheckOut;