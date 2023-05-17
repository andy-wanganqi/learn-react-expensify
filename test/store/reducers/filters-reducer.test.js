import moment from 'moment';
import { filtersReducer } from '../../../src/store/reducers/filters-reducer.jsx';

test('Should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month').toDate(),
    endDate: moment().endOf('month').toDate(),
  });
});

test('Should set sort by of the filters to be description', () => {
  const prevState = {
    text: '',
    sortBy: 'amount',
  };
  const state = filtersReducer(prevState, {
    type: 'SET_SORTBY',
    sortBy: 'description'
  });
  expect(state.sortBy).toBe('description');
});

test('Should set sort by of the filters to be amount', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_SORTBY',
    sortBy: 'amount'
  });
  expect(state.sortBy).toBe('amount');
});

test('Should set text of filters', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_FILTER_TEXT',
    text: 'textvalue'
  });
  expect(state.text).toBe('textvalue');
});

test('Should set start date of filters', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_START_DATE',
    date: moment(10000).toDate(),
  });
  expect(state.startDate).toEqual(moment(10000).toDate());
});

test('Should set end date of filters', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_END_DATE',
    date: moment(10000).toDate(),
  });
  expect(state.endDate).toEqual(moment(10000).toDate());
});
