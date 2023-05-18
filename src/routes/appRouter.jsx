import React from 'react';
import { 
  BrowserRouter,
  Routes, 
  Route,
} from 'react-router-dom';
import DashboardPage from '../components/pages/dashboard-page.jsx';
import AddExpensePage from '../components/pages/add-expense-page.jsx';
import EditExpensePage from '../components/pages/edit-expense-page.jsx';
import HelpPage from '../components/pages/help-page.jsx';
import NotFoundPage from '../components/pages/not-found-page.jsx';
import Header from '../components/layout/header.jsx';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<DashboardPage />}></Route>
        <Route path="/create" element={<AddExpensePage />}></Route>
        <Route path="/edit/:id" element={<EditExpensePage />}></Route>
        <Route path="/help" element={<HelpPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;
