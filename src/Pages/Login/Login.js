import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    
    // Click Handler to get the form value
    const handleFormSubmit = event => {
        event.preventDefault();
        
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        console.log(email, password);
    }

    // Navigate to Register Page
    const navigateToRegister = () => {
        navigate('/register')
    }

    return (
        <div className='container w-50'>
            <h1 className='text-center mt-3'>Please Login</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p className='mt-3'>New to Genius-Car Services? <Link to='/register' className='text-danger text-decoration-none' onClick={() => navigateToRegister()}>Please Register</Link></p>
        </div>
    );
};

export default Login;