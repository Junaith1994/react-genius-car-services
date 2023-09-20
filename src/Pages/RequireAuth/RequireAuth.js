import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const [user] = useAuthState(auth);
    const location = useLocation();

    return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;