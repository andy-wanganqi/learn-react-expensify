import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredExpenses } from '../store/selectors/expenses.js';
import ExpenseListItem from './ExpenseListItem.jsx';
import ExpenseListFilters from './ExpenseListFilters.jsx';
import ExpenseSummary from './ExpenseSummary.jsx';
import { readExpenses } from '../store/slices/expensesSlice.js';

const ExpenseList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const expenses = selectFilteredExpenses(state);

  useEffect(() => {
    async function dispatchReadExpenses() {
      await dispatch(readExpenses());
    };
    dispatchReadExpenses();
  }, [dispatch]);

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
