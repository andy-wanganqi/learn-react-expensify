import React from 'react'
import { connect } from 'react-redux'

const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    <p>Filter by: {props.filters.text}</p>
    <p>Date range: from {props.filters.startDate} to {props.filters.endDate}</p>
    <p>Sort by: {props.filters.sortBy}</p>
    <ul>
      {props.expenses.map((a) => (
        <li key={a.id}>{a.description}</li>
      ))}
    </ul>
  </div>
)

export default connect((state) => {
  return {
    expenses: state.expenses,
    filters: state.filters,
  }
})(ExpenseList)
