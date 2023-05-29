import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ExpenseForm from '../ExpenseForm.jsx';
import { updateExpense, deleteExpense } from '../../store/slices/expensesSlice.js';
import db from '../../db';

const EditExpensePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const expenses = useSelector((state) => state.expenses);
  const [expense, setExpense] = useState();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function loadExpense() {
      const _expense = await db.readExpense(user.uid, id);
      if (_expense) {
        setExpense(_expense);
      } else {
        navigate('/dashboard');
      }
    };

    let foundExpense = expenses.find(expense => expense.id === id);
    if(foundExpense) {
      setExpense(foundExpense);
    } else if (user.uid) {
      loadExpense();
    } else {
      // TODO: Show auth
    }
  }, [user]);

  return (
    <>
      <div className="page_header">
        <div className="content-container">
          <h1>Edit Expense</h1>
        </div>
      </div>
      <div className='page_content'>
        <div className='content-container'>
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
      </div>
    </>
  );
};

export default EditExpensePage;
