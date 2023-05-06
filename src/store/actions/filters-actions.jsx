export const setFilterText = (text = '') => ({
  type: 'SET_FILTER_TEXT',
  text,
})
export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})
export const sortByCreatedAt = () => ({
  type: 'SORT_BY_CREATEDAT'
})
export const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
})
export const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
})
