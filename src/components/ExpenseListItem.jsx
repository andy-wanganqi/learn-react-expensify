import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { removeExpense } from '../store/actions/expenses-actions.jsx';

const ExpenseListItem = ({dispatch, id, description, amount, createdAt, note}) => {
  let navigate = useNavigate();
  return (
    <div>
      <p>
        <button onClick={(e) => {
          e.preventDefault();
          navigate(`/edit/${id}`);
        }}>Edit</button>
        Expense: <NavLink to={`/edit/${id}`}>{description}</NavLink> with {amount} created at: {moment(createdAt).format()} 
        <button onClick={(e) => {
          e.preventDefault();
          dispatch(removeExpense({ id }));
        }}>Remove</button>
      </p>
      <p>Note: {note}</p>
    </div>
  );
};

export default connect()(ExpenseListItem);
