import React from 'react';
import { 
  BrowserRouter,
  Routes, 
  Route,
} from 'react-router-dom';
import DashboardPage from '../components/pages/dashboardPage.jsx';
import AddExpensePage from '../components/pages/addExpensePage.jsx';
import EditExpensePage from '../components/pages/editExpensePage.jsx';
import HelpPage from '../components/pages/helpPage.jsx';
import NotFoundPage from '../components/pages/notFoundPage.jsx';
import Header from '../components/layout/header.jsx';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
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
