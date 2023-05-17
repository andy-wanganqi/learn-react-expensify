import { v4 as uuid } from 'uuid';
import { expensesReducer } from '../../../src/store/reducers/expenses-reducer.jsx';
import expenses from '../../fixtures/expenses.js';

test('Should setup default expenses', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('Should add new expense to empty array', () => {
  const expense = expenses[0];
  const action = {
    type: 'ADD_EXPENSE',
    expense,
  }
  const state = expensesReducer(undefined, action);
  expect(state).toEqual([expense]);
});

test('Should add new expense to non-empty array', () => {
  const expense = { id: uuid(), description: 'Water bill', amount: 9000, note: '123', createdAt: 1684005530000 };
  const action = {
    type: 'ADD_EXPENSE',
    expense,
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('Should edit expense which exists', () => {
  const expense = { ...expenses[2] };
  expense.description += " 2";
  expense.amount += 100;
  expense.note += '123';
  expense.createdAt += 10000;

  const action = {
    type: 'EDIT_EXPENSE',
    expense,
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ expenses[0], expenses[1], expense, expenses[3], expenses[4] ]);
});

test('Should not edit expense which does not exist', () => {
  const expense = { ...expenses[2], id: uuid() };
  expense.description += " 2";
  expense.amount += 100;
  expense.note += '123';
  expense.createdAt += 10000;

  const action = {
    type: 'EDIT_EXPENSE',
    expense,
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('Should remove expense which exists', () => {
  const { id } = expenses[2];
  const action = {
    type: 'REMOVE_EXPENSE',
    id,
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ expenses[0], expenses[1], expenses[3], expenses[4] ]);
});

test('Should not remove expense which does not exist', () => {
  const id = uuid();
  const action = {
    type: 'REMOVE_EXPENSE',
    id,
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
