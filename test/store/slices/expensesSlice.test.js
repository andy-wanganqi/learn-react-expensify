import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import reducer, { addExpense, editExpense, removeExpense, createExpense, readExpenses } from '../../../src/store/slices/expensesSlice.js';
import expenses from '../../fixtures/expenses.js';
import * as db from '../../../src/db';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Expenses redux state tests', () => {
  beforeAll(() => {
  });

  beforeEach(() => {
  });

  afterEach(() => {
  });  
  
  it('Should initialize expenses', () => {
    expect(reducer(undefined, { type: undefined })).toEqual([]);
  });

  it('Should add expense', async () => {
    const previousState = [expenses[0], expenses[1]];
    expect(reducer(previousState, addExpense(expenses[2]))).toEqual([expenses[0], expenses[1], expenses[2]]);
  });

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
  });

  it('Should remove expense', async () => {
    const payload = {
      id: expenses[1].id
    };
    const previousState = [expenses[0], expenses[1], expenses[2]];
    expect(reducer(previousState, removeExpense(payload))).toEqual([expenses[0], expenses[2]]);
  });

  it('Should create expense', async () => {
    const mockDbExpenses = [];
    const createExpenseStub = sinon.stub(db, 'createExpense').callsFake(async (expense) => {
      mockDbExpenses.push(expense);
    });

    const store = mockStore({});
    const payload = expenses[2];
    await store.dispatch(createExpense(payload));
    const actions = store.getActions();
    expect(actions[0].type).toEqual('expenses/createExpense/pending');
    expect(actions[1].type).toEqual('expenses/createExpense/fulfilled');

    expect(mockDbExpenses).toEqual([expenses[2]]);

    createExpenseStub.restore();
  });

  it('Should read expenses', async () => {
    const mockDbExpenses = [...expenses];
    const readExpensesStub = sinon.stub(db, 'readExpenses').callsFake(async () => {
      return mockDbExpenses;
    });

    const store = mockStore({});
    await store.dispatch(readExpenses());
    const actions = store.getActions();
    expect(actions[0].type).toEqual('expenses/readExpenses/pending');
    expect(actions[1].type).toEqual('expenses/readExpenses/fulfilled');

    readExpensesStub.restore();
  });
})
