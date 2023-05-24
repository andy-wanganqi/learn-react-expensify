import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frame from '../components/layout/frame.jsx';
import LoginPage from '../components/pages/loginPage.jsx';
import DashboardPage from '../components/pages/dashboardPage.jsx';
import AddExpensePage from '../components/pages/addExpensePage.jsx';
import EditExpensePage from '../components/pages/editExpensePage.jsx';
import HelpPage from '../components/pages/helpPage.jsx';
import NotFoundPage from '../components/pages/notFoundPage.jsx';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/dashboard" element={Frame(<DashboardPage />)}></Route>
      <Route path="/create" element={Frame(<AddExpensePage />)}></Route>
      <Route path="/edit/:id" element={Frame(<EditExpensePage />)}></Route>
      <Route path="/help" element={Frame(<HelpPage />)}></Route>
      <Route path="*" element={Frame(<NotFoundPage />)}></Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
