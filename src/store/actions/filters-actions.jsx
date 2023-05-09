export const setFilterText = (text = '') => ({
  type: 'SET_FILTER_TEXT',
  text,
});
export const setSortByKeyword = (keyword = 'amount') => ({
  type: 'SET_SORTBY_KEYWORD',
  keyword,
});
export const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
});
export const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
});
