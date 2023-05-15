import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../ExpenseForm.jsx';
import { addExpense } from '../../store/actions/expenses-actions.jsx';

const AddExpensePage = (props) => (
  <div>
    <h1>Add Expense Page</h1>
    <ExpenseForm onSubmit={(expense) => {
      props.dispatch(addExpense(expense));
      props.history.push('/');
    }}></ExpenseForm>
  </div>
);

export default connect()(AddExpensePage);
