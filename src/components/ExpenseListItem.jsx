import React from 'react'
import { connect } from 'react-redux'
import { removeExpense } from '../store/actions/expenses-actions.jsx'

const ExpenseListItem = ({dispatch, id, description, amount, createdAt, note}) => (
  <div>
    <p>
      Expense: {description} with {amount} created at: {createdAt} 
      <button onClick={(e) => {
        e.preventDefault()
        dispatch(removeExpense({ id }))
      }}>Remove</button>
    </p>
    <p>Note: {note}</p>
  </div>
)

export default connect()(ExpenseListItem)
