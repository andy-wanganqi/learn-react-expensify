import { v4 as uuid } from 'uuid';
import { addExpense, editExpense, removeExpense } from '../../../src/store/actions/expenses-actions.jsx';

test('Should setup add expense action with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      amount: 0,
      createdAt: 0,
      note: '',
      id: expect.any(String),
    },
  });
});

test('Should setup add expense action with provided values', () => {
  const description = 'a description'; 
  const amount = 12345;
  const createdAt = 12345;
  const note = 'a note'; 
  const action = addExpense({
    description,
    amount,
    createdAt,
    note,
  });
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description,
      amount,
      createdAt,
      note,
      id: expect.any(String),
    },
  });
});

test('Should setup edit expense action', () => {
  const id = uuid();
  const description = 'a description'; 
  const amount = 12345;
  const createdAt = 12345;
  const note = 'a note'; 
  const action = editExpense({
    id,
    description,
    amount,
    createdAt,
    note,
  })
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    expense: {
      id,
      description,
      amount,
      createdAt,
      note,
    }
  });
});

test('Should setup remove expense action', () => {
  const id = uuid();
  const action = removeExpense({ id });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id,
  });
});
