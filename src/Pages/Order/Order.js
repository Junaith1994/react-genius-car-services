import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import axiosPrivate from '../../API/axiosPrivate';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const { email } = user;
    console.log(orders);
    useEffect(() => {
        const url = `https://genius-car-services-server-2etrtww8e.vercel.app/orders?email=${email}`;
        axiosPrivate.get(url)
        .then(response => setOrders(response.data))
        .catch(error => {
            // Navigating user to the login page based on http status code 401 or 403
            if(error.response.status === 403 || error.response.status === 401) {
                signOut(auth);
                navigate('/login');
            }
        })
    }, [email])

    return (
        <div>
            <h1>Your Orders: {orders.length}</h1>
        </div>
    );
};

export default Order;