import moment from 'moment';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import { setFilterText, setDateRange, setSortBy } from '../store/slices/filtersSlice.js';

const ExpenseListFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const { startDate, endDate } = filters;
  const start = startDate === null ? null : moment(startDate).toDate();
  const end = endDate === null ? null : moment(endDate).toDate();

  return (
    <div className='page_content'>
      <div className='content-container'>
        <div className='field-group'>
          <div className='field-group__item'>
            <input className='text-input' 
              type="text"
              placeholder="Search expenses"
              value={filters.text} 
              onChange={(e) => {
                dispatch(setFilterText(e.target.value))
              }}
            />
          </div>
          <div className='field-group__item date-picker-wrapper-patch'>
            <DatePicker 
              className='text-input'
              placeholderText='Select date range' 
              isClearable
              dateFormat="dd/MM/yyyy" 
              selectsRange={true}
              startDate={start}
              endDate={end}
              onChange={(update) => {
                const [ start, end ] = update;
                const startDate = start === null ? null : moment(start).valueOf();
                const endDate = end === null ? null : moment(end).valueOf();
                dispatch(setDateRange({
                  startDate,
                  endDate,
                }))
              }}
            />  
          </div>
          <div className='field-group__item'>
            <select className='select'
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
      </div>
    </div>
  );
};

export default ExpenseListFilters;
