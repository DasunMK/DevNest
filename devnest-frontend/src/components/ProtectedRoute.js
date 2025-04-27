// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';  // Updated import for Navigate

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken') ? true : false;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;  // Use Navigate to redirect to login
  }

  return children;  // If authenticated, render the protected content
};

export default ProtectedRoute;
