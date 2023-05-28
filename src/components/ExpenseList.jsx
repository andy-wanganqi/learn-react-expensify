import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredExpenses } from '../store/selectors/expenses.js';
import ExpenseListItem from './ExpenseListItem.jsx';
import ExpenseListFilters from './ExpenseListFilters.jsx';
import ExpenseSummary from './ExpenseSummary.jsx';
import { readExpenses } from '../store/slices/expensesSlice.js';

const ExpenseList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const expenses = useSelector((state) => state.expenses);
  const filters = useSelector((state) => state.filters);
  const selectedExpenses = selectFilteredExpenses({ expenses, filters });

  useEffect(() => {
    async function dispatchReadExpenses() {
      await dispatch(readExpenses({
        uid: user.uid,
      }));
    };
    dispatchReadExpenses();
  }, [user]);

  return (
    <>
      <ExpenseListFilters />
      {
        (selectedExpenses && selectedExpenses.length > 0) ? (
          <>
            <ul>
              {selectedExpenses.map((expense) => (
                <li key={expense.id}>
                  <ExpenseListItem expense={expense} />
                </li>
              ))}
            </ul>
            <ExpenseSummary />
          </>
        ) : (
          <>
            <p>There is no expenses.</p>
          </>
        )
      }
    </>
  )
};

export default ExpenseList;
