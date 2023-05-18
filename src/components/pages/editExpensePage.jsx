import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ExpenseForm from '../ExpenseForm.jsx';
import { editExpense, removeExpense } from '../../store/slices/expensesSlice.jsx';

const EditExpensePage = () => {
  let { id } = useParams();
  const expenses = useSelector((state) => state.expenses);
  const expense = expenses.find(expense => expense.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!expense) {
    navigate('/');
  } else {
    return (
      <div>
        <h1>Edit Expense Page</h1>
        <ExpenseForm 
          expense={expense}
          handleSaveExpense={(expense) => {
            dispatch(editExpense({
              ...expense,
              id,
            }));
            navigate('/');
          }}
          handleRemoveExpense={() => {
            dispatch(removeExpense({
              id
            }));
            navigate('/');
          }}
        />
      </div>
    );
  }
};

export default EditExpensePage;
