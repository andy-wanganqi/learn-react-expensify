import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredExpenses } from '../../store/selectors/expenses.js';
import { Link } from 'react-router-dom';
import ExpenseList from '../ExpenseList.jsx';
import ExpenseSummary from '../ExpenseSummary.jsx';

const DashboardPage = () => {
  const expenses = useSelector((state) => state.expenses);
  const filters = useSelector((state) => state.filters);
  const selectedExpenses = selectFilteredExpenses({ expenses, filters });
  
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
