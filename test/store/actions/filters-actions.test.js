import moment from 'moment';
import { setFilterText, setSortByKeyword, setStartDate, setEndDate } from '../../../src/store/actions/filters-actions.jsx';

test('Should setup set filter text action with default value', () => {
  const action = setFilterText();
  expect(action).toEqual({
    type: 'SET_FILTER_TEXT',
    text: '',
  });
});

test('Should setup set filter text action with provided value', () => {
  const text = 'bill';
  const action = setFilterText(text);
  expect(action).toEqual({
    type: 'SET_FILTER_TEXT',
    text,
  });
});

test('Should setup set sort by keyword action with default value', () => {
  const action = setSortByKeyword();
  expect(action).toEqual({
    type: 'SET_SORTBY_KEYWORD',
    keyword: 'amount',
  });
});

test('Should setup set sort by keyword action with provided value', () => {
  const keyword = 'description';
  const action = setSortByKeyword(keyword);
  expect(action).toEqual({
    type: 'SET_SORTBY_KEYWORD',
    keyword,
  });
});

test('Should setup set start date action', () => {
  const date = moment(0).toDate();
  const action = setStartDate(date);
  expect(action).toEqual({
    type: 'SET_START_DATE',
    date,
  });
});

test('Should setup set end date action', () => {
  const date = moment(0).toDate();
  const action = setEndDate(date);
  expect(action).toEqual({
    type: 'SET_END_DATE',
    date,
  });
});
