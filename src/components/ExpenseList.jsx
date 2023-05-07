import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem.jsx'
import { getVisibleExpenses } from './../store/selectors/expenses-selector.jsx'
import ExpenseListFilters from './ExpenseListFilters.jsx'

const ExpenseList = ({expenses}) => (
  <div>
    <h1>Expense List</h1>
    <ExpenseListFilters />
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
  }
}

export default connect(mapStateToProps)(ExpenseList)
