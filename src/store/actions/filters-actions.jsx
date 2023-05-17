export const setFilterText = (text = '') => ({
  type: 'SET_FILTER_TEXT',
  text,
});
export const setSortByKeyword = (sortBy = 'amount') => ({
  type: 'SET_SORTBY',
  sortBy,
});
export const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
});
export const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
});
