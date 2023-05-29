import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredExpenses } from '../store/selectors/expenses.js';
import ExpenseListItem from './ExpenseListItem.jsx';
import ExpenseListFilters from './ExpenseListFilters.jsx';
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
      <>
        <div className='desktop-hide'>
          <div className='list-header'>
            <div>Expenses</div>
          </div>
          <div className='list-body'>
            {(selectedExpenses && selectedExpenses.length > 0) ? (
              selectedExpenses.map((expense) => (
                <ExpenseListItem key={expense.id} expense={expense} />
              ))
            ) : (
              <div className='list-no-items-row'>
                  There is no expenses.
              </div>
            )}
          </div>
        </div>

        <div className='desktop-show'>
          <div className='list-header'>
            <div>Expense</div>
            <div>Amount</div>
          </div>
          <div className='list-body'>
            {(selectedExpenses && selectedExpenses.length > 0) ? (
              selectedExpenses.map((expense) => (
                <ExpenseListItem key={expense.id} expense={expense} />
              ))
            ) : (
              <div className='list-no-items-row'>
                  There is no expenses.
              </div>
            )}
          </div>
        </div>
      </>
      
    </>
  )
};

export default ExpenseList;
