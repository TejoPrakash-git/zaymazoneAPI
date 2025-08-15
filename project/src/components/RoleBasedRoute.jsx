import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

/**
 * RoleBasedRoute component to handle role-based access control
 * Redirects to home page if user doesn't have the required role
 * @param {Array} allowedRoles - Array of roles allowed to access the route
 */
const RoleBasedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default RoleBasedRoute;