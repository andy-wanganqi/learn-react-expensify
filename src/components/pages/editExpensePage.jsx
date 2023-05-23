import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ExpenseForm from '../ExpenseForm.jsx';
import { updateExpense, deleteExpense } from '../../store/slices/expensesSlice.js';

const EditExpensePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const expenses = useSelector((state) => state.expenses);
  const expense = expenses.find(expense => expense.id === id);

  useEffect(() => {
    if (!expense) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Edit Expense Page</h1>
      <ExpenseForm 
        expense={expense}
        handleSaveExpense={async (expense) => {
          const payload = {
            ...expense,
            id,
          };
          await dispatch(updateExpense(payload));
          navigate('/');
        }}
        handleRemoveExpense={async () => {
          const payload = {
            id
          };
          await dispatch(deleteExpense(payload));
          navigate('/');
        }}
      />
    </div>
  );
};

export default EditExpensePage;
