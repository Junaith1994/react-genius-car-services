import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import useToken from '../hooks/useToken';

const Register = () => {
    // State for check-box
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    
    // Firebase Hook to create user with email & password
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updateError] = useUpdateProfile(auth);
    
    // Creating access token for a new user and saving to localStorage
    const [token] = useToken(user);
    // console.log(user);
    // console.log(updateError);
    // Form submit handler
    const handleFormSubmit = async event => {
        event.preventDefault();
        const email = event.target.email.value;
        const name = event.target.name.value;
        const password = event.target.password.value;

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
    }

    // Navigate to home after successfully register
    if (token) {
        navigate('/home')
    }

    return (
        <div className='container w-50'>
            <h1 className='text-center mt-3'>Please Register</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name' type="text" placeholder="Enter name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" className={checked ? 'text-primary' : 'text-danger'} onClick={() => setChecked(!checked)} name='terms' label="Accept Genius Car Terms and Conditions" />
                </Form.Group>
                {user ? <p className='text-success'>Account created successfully</p> : <p className='text-danger'>{error} {updateError?.message}</p>}
                <Button variant="primary d-block w-50 mx-auto" disabled={!checked} type="submit">
                    Register
                </Button>
            </Form>
            <p className='mt-3'>Already have an account? <Link to='/login' className='text-danger text-decoration-none'>Please Login</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;