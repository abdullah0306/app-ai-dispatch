import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (requireAuth && !currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated and tries to access /login, redirect to setup page (/)
  if (!requireAuth && currentUser && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 