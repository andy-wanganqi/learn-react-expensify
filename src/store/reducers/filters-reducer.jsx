const defaultFiltersOfState = {
  text: '',
  sortBy: 'amount',
  startDate: undefined,
  endDate: undefined,
}
export const filterReducer = (filterOfState = defaultFiltersOfState, action) => {
  switch (action.type) {
    case 'SET_FILTER_TEXT':
      return {
        ...filterOfState,
        text: action.text || ''
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...filterOfState,
        sortBy: 'amount',
      }
      case 'SORT_BY_CREATEDAT':
        return {
          ...filterOfState,
          sortBy: 'createdAt',
      }
      case 'SET_START_DATE':
        return {
          ...filterOfState,
          startDate: action.date,
        }
      case 'SET_END_DATE':
        return {
          ...filterOfState,
          endDate: action.date,
        }
      default:
        return filterOfState
  }
}
