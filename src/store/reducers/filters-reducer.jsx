import moment from 'moment';

const defaultFiltersOfState = {
  text: '',
  sortBy: 'amount',
  startDate: moment().startOf('month').toDate(),
  endDate: moment().endOf('month').toDate(),
};
export const filtersReducer = (filterOfState = defaultFiltersOfState, action) => {
  switch (action.type) {
    case 'SET_FILTER_TEXT':
      return {
        ...filterOfState,
        text: action.text || ''
      };
    case 'SET_SORTBY':
      return {
        ...filterOfState,
        sortBy: action.sortBy
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
