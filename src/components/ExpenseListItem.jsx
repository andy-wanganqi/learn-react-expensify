import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteExpense } from '../store/slices/expensesSlice.js';
import { formatCurrency } from '../utils/amountConvert.js';

const ExpenseListItem = ({ expense }) => {
  const { id, description, amount, createdAt, note } = expense;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <p>
        <button onClick={(e) => {
          e.preventDefault();
          navigate(`/edit/${id}`);
        }}>Edit</button>
        Expense: <NavLink to={`/edit/${id}`}>{description}</NavLink> with {formatCurrency(amount)} created at: {moment(createdAt).format()} 
        <button onClick={async (e) => {
          e.preventDefault();
          await dispatch(deleteExpense({ id }));
        }}>Remove</button>
      </p>
      <p>Note: {note}</p>
    </div>
  );
};

export default ExpenseListItem;
