import { v4 as uuid } from 'uuid';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import ExpenseForm from '../ExpenseForm.jsx';
import { createExpense } from '../../store/slices/expensesSlice.js';

const AddExpensePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Add Expense Page</h1>
      <ExpenseForm 
        handleSaveExpense={async (expense) => {
          const payload = {
            ...expense,
            id: uuid(),
          };
          await dispatch(createExpense(payload));
          navigate('/');
        }}
      />
    </div>
  );
};

export default AddExpensePage;
