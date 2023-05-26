import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ExpenseForm from '../ExpenseForm.jsx';
import { updateExpense, deleteExpense } from '../../store/slices/expensesSlice.js';

const EditExpensePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const params = useParams();
  const { id } = params;

  const expenses = useSelector((state) => state.expenses);
  const expense = expenses.find(expense => expense.id === id); // TODO: to read expense from db, rather than read expense from store

  useEffect(() => {
    if (!expense) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Edit Expense Page</h1>
      <ExpenseForm 
        expense={expense}
        handleSaveExpense={(updatedExpense) => {
          const action = updateExpense({
            uid: user.uid,
            expense: {
              ...updatedExpense,
              id: expense.id,
            },
          });
          dispatch(action);
          navigate('/dashboard');
        }}
        handleRemoveExpense={() => {
          const action = deleteExpense({
            uid: user.uid,
            expenseId: expense.id,
          });
          dispatch(action);
          navigate('/dashboard');
        }}
      />
    </div>
  );
};

export default EditExpensePage;
