import moment from 'moment';
import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month').valueOf(),
    endDate: moment().endOf('month').valueOf(),
  },
  reducers: {
    setFilterText: (state, action) => {
      state.text = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilterText, setSortBy, setStartDate, setEndDate } = filtersSlice.actions;

export default filtersSlice.reducer;
