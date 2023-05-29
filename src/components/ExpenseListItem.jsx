import moment from 'moment';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteExpense } from '../store/slices/expensesSlice.js';
import { formatAmount, formatDate } from '../utils/amountConvert.js';

const ExpenseListItem = ({ expense }) => {
  const { id, description, amount, createdAt, note } = expense;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleRemoveExpense = (async (e) => {
    e.preventDefault();
    const action = deleteExpense({
      uid: user.uid,
      expenseId: id,
    })
    await dispatch(action);
  });

  return (
    <>
      <div className='desktop-hide'>
        <Link to={`/edit/${id}`} className='list-row'>
          <div className='list-column'>
            <div className='list-item__title'>{description}</div>
            <div>
              <span>{formatDate(createdAt)}</span>
            </div>  
            <div className='list-item__emphasize'>{formatAmount(amount)}</div>
          </div>
          <div className='list-column'>
            <div>
              <button className='button button-md' onClick={handleRemoveExpense}>Remove</button>
            </div>
          </div>
        </Link>
      </div>

      <div className='desktop-show'>
        <Link to={`/edit/${id}`} className='list-row'>
          <div className='list-column'>
            <div className='row'>
              <div className='column'>
                <div className='list-item__title'>{description}</div>
                <div>
                  <span>{formatDate(createdAt)}</span>
                </div>  
              </div>
              <div className='column'>{note}</div>
            </div>
          </div>
          <div className='list-column'>
            <div className='list-item__emphasize list-item-pull-right'>{formatAmount(amount)}</div>
            <div>
              <button className='button button-md' onClick={handleRemoveExpense}>Remove</button>
            </div>
          </div>
        </Link>

      </div>
    </>
  );
};

export default ExpenseListItem;
