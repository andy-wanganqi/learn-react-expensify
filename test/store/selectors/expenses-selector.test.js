import moment from 'moment';
import { getVisibleExpenses } from '../../../src/store/selectors/expenses-selector.jsx';
import expenses from '../../fixtures/expenses.js';

test('Should filter by text', () => {
  const filters = {
    text: 'Bill',
    sortBy: 'createdAt',
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[4], expenses[3] ]);
});

test('Should filter by start date', () => {
  const filters = {
    sortBy: 'createdAt',
    startDate: moment(2000).toDate(),
    endDate: undefined,
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[2], expenses[4], expenses[3] ]);
});

test('Should filter by end date', () => {
  const filters = {
    sortBy: 'createdAt',
    startDate: undefined,
    endDate: moment(2000).toDate(),
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[0], expenses[1], expenses[2] ]);
});

test('Should filter by start date and end date', () => {
  const filters = {
    sortBy: 'createdAt',
    startDate: moment(1000).toDate(),
    endDate: moment(3000).toDate(),
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[1], expenses[2], expenses[4] ]);
});

test('Should filter by nothing', () => {
  const filters = {
    sortBy: 'createdAt',
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[0], expenses[1], expenses[2], expenses[4], expenses[3] ]);
});

test('Should sort by description', () => {
  const filters = {
    sortBy: 'description',
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[2], expenses[0], expenses[3], expenses[1], expenses[4] ]);
});

test('Should sort by note', () => {
  const filters = {
    sortBy: 'note',
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[1], expenses[2], expenses[3], expenses[4], expenses[0] ]);
});

test('Should sort by amount', () => {
  const filters = {
    sortBy: 'amount',
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[0], expenses[2], expenses[4], expenses[3], expenses[1] ]);
});

test('Should sort by createdAt', () => {
  const filters = {
    sortBy: 'createdAt',
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([ expenses[0], expenses[1], expenses[2], expenses[4], expenses[3] ]);
});

test('Should sort by nothing', () => {
  const filters = {};
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual(expenses);
});
