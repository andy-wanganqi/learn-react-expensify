const defaultFiltersOfState = {
  text: '',
  sortBy: 'amount',
  startDate: undefined,
  endDate: undefined,
};
export const filtersReducer = (filterOfState = defaultFiltersOfState, action) => {
  switch (action.type) {
    case 'SET_FILTER_TEXT':
      return {
        ...filterOfState,
        text: action.text || ''
      };
    case 'SET_SORTBY_KEYWORD':
      return {
        ...filterOfState,
        sortBy: action.keyword
      };
    case 'SET_START_DATE':
      return {
        ...filterOfState,
        startDate: action.date,
      };
    case 'SET_END_DATE':
      return {
        ...filterOfState,
        endDate: action.date,
      };
    default:
      return filterOfState;
  }
};
