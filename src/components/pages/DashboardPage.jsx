import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredExpenses } from '../../store/selectors/expenses.js';
import { Link } from 'react-router-dom';
import ExpenseList from '../ExpenseList.jsx';
import ExpenseSummary from '../ExpenseSummary.jsx';
import LoadingPage from './LoadingPage.jsx';

// TODO: This page should be renamed as ExpenseManager
const DashboardPage = () => {
  const user = useSelector((state) => state.user);
  const expenses = useSelector((state) => state.expenses);
  const filters = useSelector((state) => state.filters);
  const selectedExpenses = selectFilteredExpenses({ expenses, filters });
  
  if (user.__authentication === undefined) {
    return (
      <LoadingPage />
    )
  } 
  
  return (
    <>
      <div className="page_header">
        <div className="content-container">
          <Link to="/create" className='button button-lg button-pull-left'>Add Expense</Link>
        </div>
      </div>
      <div className='page_content'>
        <div className='content-container'>
          <ExpenseList />
        </div>
      </div>
      {selectedExpenses && selectedExpenses.length > 0 && (
        <div className="page_footer">
          <div className="content-container">
            <ExpenseSummary />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
