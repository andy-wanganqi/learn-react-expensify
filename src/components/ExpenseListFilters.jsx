import React from 'react'
import { connect } from 'react-redux'
import { setFilterText, setSortByKeyword } from './../store/actions/filters-actions.jsx'

const ExpenseListFilters = ({ dispatch, filters }) => (
  <div>
    <p>
      Filter by: 
      <input 
        type="text" 
        value={filters.text} 
        onChange={(e) => {
          dispatch(setFilterText(e.target.value))
        }}
      />
    </p>
    <p>Date range: from {filters.startDate} to {filters.endDate}</p>
    <p>
      Sort by: {filters.sortBy}
      <select 
        value={filters.sortBy} 
        onChange={(e) => {
          dispatch(setSortByKeyword(e.target.value))
        }} 
      >
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
    </p>
  </div>
)

const mapStateToProps = ({filters}) => {
  return {
    filters,
  }
}

export default connect(mapStateToProps)(ExpenseListFilters)