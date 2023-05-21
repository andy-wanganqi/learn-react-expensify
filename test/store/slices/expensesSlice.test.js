import reducer, { addExpense, editExpense, removeExpense } from '../../../src/store/slices/expensesSlice.js';
import expenses from '../../fixtures/expenses.js';

describe('Expenses redux state tests', () => {
  beforeAll(() => {
  })
  
  it('Should initialize expenses', () => {
    expect(reducer(undefined, { type: undefined })).toEqual([]);
  })

  it('Should add expense', async () => {
    const previousState = [expenses[0], expenses[1]];
    expect(reducer(previousState, addExpense(expenses[2]))).toEqual([expenses[0], expenses[1], expenses[2]]);
  })

  it('Should edit expense', async () => {
    const editedExpense = {
      ...expenses[1],
      description: 'new description',
      note: 'new note',
      createdAt: 123000,
      amount: 12345,
    };
    const previousState = [expenses[0], expenses[1], expenses[2]];
    expect(reducer(previousState, editExpense(editedExpense))).toEqual([expenses[0], editedExpense, expenses[2]]);
  })

  it('Should remove expense', async () => {
    const payload = {
      id: expenses[1].id
    };
    const previousState = [expenses[0], expenses[1], expenses[2]];
    expect(reducer(previousState, removeExpense(payload))).toEqual([expenses[0], expenses[2]]);
  })

})
