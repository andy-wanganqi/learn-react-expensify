import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from '../components/pages/LoginPage.jsx';
import DashboardPage from '../components/pages/DashboardPage.jsx';
import AddExpensePage from '../components/pages/AddExpensePage.jsx';
import EditExpensePage from '../components/pages/EditExpensePage.jsx';
import NotFoundPage from '../components/pages/NotFoundPage.jsx';
import PrivateRoute from './privateRoute.jsx';
import auth from '../auth';
import Frame from '../components/layout/Frame.jsx';

const AppRouter = () => {
  const user = useSelector((state) => state.user);
  const isAllowed = user.__authentication === undefined || auth.isAuthenticatedUser(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={
            <PrivateRoute 
              redirectPath='/' 
              isAllowed={isAllowed}
            >
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/create" element={
            <PrivateRoute 
              redirectPath='/' 
              isAllowed={isAllowed}
            >
              <AddExpensePage />
            </PrivateRoute>
          }
        />
        <Route path="/edit/:id" element={
            <PrivateRoute 
              redirectPath='/' 
              isAllowed={isAllowed}
            >
              <EditExpensePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={Frame(<NotFoundPage />)} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
