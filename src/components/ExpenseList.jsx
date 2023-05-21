import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredExpenses } from '../store/selectors/expenses.js';
import ExpenseListItem from './ExpenseListItem.jsx';
import ExpenseListFilters from './ExpenseListFilters.jsx';
import ExpenseSummary from './ExpenseSummary.jsx';

const ExpenseList = () => {
  const state = useSelector((state) => state);
  const expenses = selectFilteredExpenses(state);
  return (
    <div>
      <h1>Expense List</h1>
      {
        (expenses && expenses.length > 0) ? (
          <div>
            <ExpenseListFilters />
            <div>Filters</div>
            <ul>
              {expenses.map((expense) => (
                <li key={expense.id}>
                  <ExpenseListItem expense={expense} />
                </li>
              ))}
            </ul>
            <ExpenseSummary />
          </div>
        ) : (
          <div>
            <ExpenseListFilters />
            <p>There is no expenses.</p>
          </div>
        )
      }
    </div>
  )
};

export default ExpenseList;
