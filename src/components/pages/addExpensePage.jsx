import { v4 as uuid } from 'uuid';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import ExpenseForm from '../ExpenseForm.jsx';
import { addExpense } from '../../store/slices/expensesSlice.js';

const AddExpensePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Add Expense Page</h1>
      <ExpenseForm 
        handleSaveExpense={(expense) => {
          dispatch(addExpense({
            ...expense,
            id: uuid(),
          }));
          navigate('/');
        }}
      />
    </div>
  );
};

export default AddExpensePage;
