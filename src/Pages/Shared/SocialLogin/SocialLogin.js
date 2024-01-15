import React from 'react';
import googleLogo from '../../../../src/images/Logo/google.png'
import facebookLogo from '../../../../src/images/Logo/facebook.jpg'
import githubLogo from '../../../../src/images/Logo/github.png'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';

const SocialLogin = () => {
    // Necessary hooks
    const [signInWithGoogle, user, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading, error1] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    const location = useLocation();

    // Creating access token for social login and saving to localStorage
    const [token] = useToken(user || user1);

    // Location tracing to redirect to the intended page
    let from = location.state?.from?.pathname || "/";

    // Redirect to home page after google login successfully
    if (token) {
        navigate(from, { replace: true });
    }

    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='w-50 bg-secondary'></div>
                <p className='mt-2 px-3'>OR</p>
                <div style={{ height: '1px' }} className='w-50 bg-secondary'></div>
            </div>
            <div>
                <p className='text-danger'>{error?.message} {error1?.message}</p>
            </div>
            <div className='text-center mb-2'>
                <button className='btn btn-info w-50' onClick={() => signInWithGoogle()}>
                    <img width={'40px'} src={googleLogo} alt="" />
                    <span className='mx-2'>Google Sign-in</span>
                </button>
            </div>
            <div className='text-center mb-2'>
                <button className='btn btn-info w-50'>
                    <img width={'40px'} src={facebookLogo} alt="" />
                    <span className='mx-2'>Sign-in with Facebook</span>
                </button>
            </div>
            <div className='text-center'>
                <button className='btn btn-info w-50' onClick={() => signInWithGithub()}>
                    <img width={'40px'} src={githubLogo} alt="" />
                    <span className='mx-2'>Sign-in with GitHub</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;