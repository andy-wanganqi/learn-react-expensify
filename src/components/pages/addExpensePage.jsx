import { v4 as uuid } from 'uuid';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ExpenseForm from '../ExpenseForm.jsx';
import { createExpense } from '../../store/slices/expensesSlice.js';

const AddExpensePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Add Expense Page</h1>
      <ExpenseForm 
        handleSaveExpense={async (expense) => {
          const action = createExpense({
            uid: user.uid,
            expense: {
              ...expense,
              id: uuid(),
            },
          });
          await dispatch(action);
          navigate('/');
        }}
      />
    </div>
  );
};

export default AddExpensePage;
