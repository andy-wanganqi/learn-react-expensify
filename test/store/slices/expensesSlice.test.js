import { addExpense, editExpense, removeExpense } from '../../../src/store/slices/expensesSlice.jsx';
import createStore from '../../../src/store/store.jsx';
import expenses from '../../fixtures/expenses.js';

describe('Expenses redux state tests', () => {
  beforeAll(() => {
  })
  
  it('Should initialize expenses', () => {
    const store = createStore();
    const state = store.getState();
    expect(state.expenses).toEqual([]);
  })

  it('Should add expense', async () => {
    const store = createStore();
    await store.dispatch(addExpense(expenses[0]));
    await store.dispatch(addExpense(expenses[1]));
    const result = await store.dispatch(addExpense(expenses[2]));
    expect(result.payload).toBe(expenses[2]);
    const state = store.getState();
    expect(state.expenses).toEqual([ expenses[0], expenses[1], expenses[2] ]);
  })

  it('Should edit expense', async () => {
    const store = createStore();
    await store.dispatch(addExpense(expenses[0]));
    await store.dispatch(addExpense(expenses[1]));
    await store.dispatch(addExpense(expenses[2]));
    const newExpense = {
      ...expenses[1],
      description: 'new description',
      note: 'new note',
      createdAt: 123000,
      amount: 12345,
    };
    const result = await store.dispatch(editExpense(newExpense));
    expect(result.payload).toEqual(newExpense);
    const state = store.getState();
    expect(state.expenses).toEqual([ expenses[0], newExpense, expenses[2] ]);
  })

  it('Should remove expense', async () => {
    const store = createStore();
    await store.dispatch(addExpense(expenses[0]));
    await store.dispatch(addExpense(expenses[1]));
    await store.dispatch(addExpense(expenses[2]));
    const payload = {
      id: expenses[1].id
    };
    const result = await store.dispatch(removeExpense(payload));
    expect(result.payload).toEqual(payload);
    const state = store.getState();
    expect(state.expenses).toEqual([ expenses[0], expenses[2] ]);
  })

})
