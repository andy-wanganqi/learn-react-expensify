import { v4 as uuid } from 'uuid';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ExpenseForm from '../ExpenseForm.jsx';
import LoadingPage from './LoadingPage.jsx';
import { createExpense } from '../../store/slices/expensesSlice.js';

const AddExpensePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (user.__authentication === undefined) {
    return (
      <LoadingPage />
    )
  }

  return (
    <>
      <div className="page_header">
        <div className="content-container">
          <h1>Add Expense</h1>
        </div>
      </div>
      <div className='page_content'>
        <div className='content-container'>
          <ExpenseForm 
            handleSaveExpense={(expense) => {
              const action = createExpense({
                uid: user.uid,
                expense: {
                  ...expense,
                  id: uuid(),
                },
              });
              dispatch(action);
              navigate('/dashboard');
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AddExpensePage;
