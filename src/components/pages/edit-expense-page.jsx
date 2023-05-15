import React from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ExpenseForm from '../ExpenseForm.jsx';
import { editExpense, removeExpense } from '../../store/actions/expenses-actions.jsx';

const EditExpensePage = (props) => {
  let { id } = useParams();
  const expense = props.expenses.find(expense => expense.id === id);
  let navigate = useNavigate();
  return (
    <div>
      <h1>Edit Expense Page</h1>
      <ExpenseForm 
        expense={expense}
        handleSaveExpense={(expense) => {
          props.dispatch(editExpense({
            id,
            ...expense
          }));
          navigate('/');
        }}
        handleRemoveExpense={() => {
          props.dispatch(removeExpense({
            id
          }));
          navigate('/');
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  }
};

export default connect((state) => state)(EditExpensePage);
