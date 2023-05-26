import moment from 'moment';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteExpense } from '../store/slices/expensesSlice.js';
import { formatAmount } from '../utils/amountConvert.js';

const ExpenseListItem = ({ expense }) => {
  const { id, description, amount, createdAt, note } = expense;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <div>
      <p>
        <button onClick={(e) => {
          e.preventDefault();
          navigate(`/edit/${id}`);
        }}>Edit</button>
        Expense: <NavLink to={`/edit/${id}`}>{description}</NavLink> with {formatAmount(amount)} created at: {moment(createdAt).format()} 
        <button onClick={async (e) => {
          e.preventDefault();
          const action = deleteExpense({
            uid: user.uid,
            expenseId: id,
          })
          await dispatch(action);
        }}>Remove</button>
      </p>
      <p>Note: {note}</p>
    </div>
  );
};

export default ExpenseListItem;
