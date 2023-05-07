import React from 'react'

const ExpenseListItem = ({description, amount, createdAt, note}) => (
  <div>
    <p>
      Expense: {description} with {amount} created at: {createdAt}
    </p>
    <p>Note: {note}</p>
  </div>
)

export default ExpenseListItem
