import React from 'react';
import { Link } from 'react-router-dom';
import ExpenseList from '../ExpenseList.jsx';

const DashboardPage = () => (
  <div>
    <div className="page_header">
      <div className="content-container">
        <Link to="/create" className='button button-lg button-pull-left'>Add Expense</Link>
      </div>
    </div>
    <ExpenseList />
  </div>
);

export default DashboardPage;
