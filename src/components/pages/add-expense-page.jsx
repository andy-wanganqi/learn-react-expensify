import React from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import ExpenseForm from '../ExpenseForm.jsx';
import { addExpense } from '../../store/actions/expenses-actions.jsx';

const AddExpensePage = (props) => {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Add Expense Page</h1>
      <ExpenseForm 
        handleSaveExpense={(expense) => {
          props.dispatch(addExpense(expense));
          navigate('/');
        }}
      />
    </div>
  );
};

export default connect()(AddExpensePage);
