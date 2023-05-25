import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from '../components/pages/loginPage.jsx';
import DashboardPage from '../components/pages/dashboardPage.jsx';
import AddExpensePage from '../components/pages/addExpensePage.jsx';
import EditExpensePage from '../components/pages/editExpensePage.jsx';
import HelpPage from '../components/pages/helpPage.jsx';
import NotFoundPage from '../components/pages/notFoundPage.jsx';
import PrivateRoute from './privateRoute.jsx';
import { setUser, clearUser } from '../store/slices/userSlice.js';
import auth from '../auth';
import Frame from '../components/layout/frame.jsx';

const AppRouter = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    auth.userAuth(
      (user) => {
        const payload = user;
        dispatch(setUser(payload));
      }, 
      () => { 
        dispatch(clearUser());
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={
            <PrivateRoute 
              redirectPath='/' 
              isAllowed={auth.isAuthenticatedUser(user)}
            >
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/create" element={
            <PrivateRoute 
              redirectPath='/' 
              isAllowed={auth.isAuthenticatedUser(user)}
            >
              <AddExpensePage />
            </PrivateRoute>
          }
        />
        <Route path="/edit/:id" element={
            <PrivateRoute 
              redirectPath='/' 
              isAllowed={auth.isAuthenticatedUser(user)}
            >
              <EditExpensePage />
            </PrivateRoute>
          }
        />
        <Route path="/help" element={Frame(<HelpPage />)} />
        <Route path="*" element={Frame(<NotFoundPage />)} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
