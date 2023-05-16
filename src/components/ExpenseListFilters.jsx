import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import { setFilterText, setSortByKeyword, setStartDate, setEndDate } from './../store/actions/filters-actions.jsx';

const ExpenseListFilters = ({ dispatch, filters }) => (
  <div>
    <div>
      Filter by: 
      <input 
        type="text" 
        value={filters.text} 
        onChange={(e) => {
          dispatch(setFilterText(e.target.value))
        }}
      />
    </div>
    <div>Date range: from 
      <DatePicker showIcon selected={filters.startDate} onChange={(date) => {
        dispatch(setStartDate(date))
      }} 
      dateFormat="dd/MM/yyyy"/>
      to 
      <DatePicker showIcon selected={filters.endDate} onChange={(date) => {
        dispatch(setEndDate(date))
      }} 
      dateFormat="dd/MM/yyyy"/>
    </div>
    <div>
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
    </div>
  </div>
)

const mapStateToProps = ({filters}) => {
  return {
    filters,
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);
