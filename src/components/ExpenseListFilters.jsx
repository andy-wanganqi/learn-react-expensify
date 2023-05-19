import moment from 'moment';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import { setFilterText, setStartDate, setEndDate, setSortBy } from '../store/slices/filtersSlice.jsx';

const ExpenseListFilters = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        Filter by: 
        <input 
          type="text"
          placeholder="Text"
          value={filters.text} 
          onChange={(e) => {
            dispatch(setFilterText(e.target.value))
          }}
        />
      </div>
      <div>Date range: from 
        <DatePicker showIcon placeholderText='StartDate'
          selected={moment(filters.startDate).toDate()} 
          onChange={(date) => {
            dispatch(setStartDate(moment(date).startOf('day').valueOf()))
          }} 
          dateFormat="dd/MM/yyyy"
        />
        to 
        <DatePicker showIcon placeholderText='EndDate' 
          selected={moment(filters.endDate).toDate()} 
          onChange={(date) => {
            dispatch(setEndDate(moment(date).startOf('day').valueOf()))
          }} 
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div>
        Sort by: {filters.sortBy}
        <select 
          value={filters.sortBy} 
          name='SortBy' placeholder='SortBy'
          onChange={(e) => {
            dispatch(setSortBy(e.target.value))
          }} 
        >
          <option value="createdAt">Date</option>
          <option value="amount">Amount</option>
        </select>
      </div>
    </div>
  );
};

export default ExpenseListFilters;
