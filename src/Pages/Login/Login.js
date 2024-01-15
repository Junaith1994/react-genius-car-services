import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.init';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import useToken from '../hooks/useToken';

const Login = () => {
    // Firebase Hook to sign-in
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    // password reset
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    
    // Creating access token with jwt and setting it in localStorage
    const [token] = useToken(user);

    // Input Field value
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    
    // Location tracing to redirect to the intended page
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";

    // Click Handler
    const handleFormSubmit = async event => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await signInWithEmailAndPassword(email, password);
    }

    // Navigate to desired page after successfully getting token
    if (token) {
        navigate(from, { replace: true });
    }

    // Navigate to Register Page
    const navigateToRegister = () => {
        navigate('/register')
    }

    // Reset Password
    const passwordReset = async () => {
        const email = emailRef.current.value;
        if (!email) {
            return toast("Please Enter Email !!")
        }
        await sendPasswordResetEmail(email);
    }

    return (
        <div className='container w-50'>
            <h1 className='text-center mt-3'>Please Login</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="Password" required />
                </Form.Group>
                {user ? <p className='text-success'>Login Successful</p> : <p className='text-danger'>{error?.message}</p>}
                <Button variant="primary d-block w-50 mx-auto" type="submit">
                    Login
                </Button>
            </Form>
            <p className='mt-3'>New to Genius-Car Services? <Link to='/register' className='text-danger text-decoration-none' onClick={() => navigateToRegister()}>Please Register</Link></p>
            <p className='mt-3'>Forget password? <Link to='' className='text-danger text-decoration-none' onClick={() => passwordReset()}>Reset Password</Link></p>
            <ToastContainer></ToastContainer>
            {sending && <p className='text-success'>Reset Mail Sending...</p>}
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;