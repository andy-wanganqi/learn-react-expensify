import moment from 'moment';
import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    text: '',
    startDate: null,
    endDate: null,
    sortBy: 'amount',
  },
  reducers: {
    setFilterText: (state, action) => {
      state.text = action.payload;
    },
    setDateRange: (state, action) => {
      const { startDate, endDate } = action.payload;
      state.startDate = startDate;
      state.endDate = endDate;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilterText, setDateRange, setSortBy } = filtersSlice.actions;

export default filtersSlice.reducer;
