import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Frame from '../components/layout/frame.jsx';

const PrivateRoute = ({
  isAllowed,
  redirectPath = '/dashboard',
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? Frame(children) : <Outlet />;
};

export default PrivateRoute;
