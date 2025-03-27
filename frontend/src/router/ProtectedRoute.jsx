//import React from 'react';
// router/ProtectedRoute.js
import PropTypes from 'prop-types';
//import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Check if the token exists in localStorage

  if (!token) {
    // If there's no token, redirect to the login page
    return <Navigate to="/register" />;
  }

  return children; // If token exists, render the protected content
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a React node
};
export default ProtectedRoute;


