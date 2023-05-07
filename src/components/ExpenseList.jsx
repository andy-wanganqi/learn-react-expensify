import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem.jsx'
import { getVisibleExpenses } from './../store/selectors/expenses-selector.jsx'

const ExpenseList = ({expenses, filters}) => (
  <div>
    <h1>Expense List</h1>
    <p>Filter by: {filters.text}</p>
    <p>Date range: from {filters.startDate} to {filters.endDate}</p>
    <p>Sort by: {filters.sortBy}</p>
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem {...expense} />
        </li>
      ))}
    </ul>
  </div>
)

const mapStateToProps = ({expenses, filters}) => {
  return {
    expenses: getVisibleExpenses(expenses, filters),
    filters: filters,
  }
}

export default connect(mapStateToProps)(ExpenseList)
