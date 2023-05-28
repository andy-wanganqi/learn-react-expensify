import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import reducer, { 
  addExpense, editExpense, removeExpense, createExpense, readExpenses, readExpense, updateExpense, deleteExpense
} from '../../../src/store/slices/expensesSlice.js';
import expenses from '../../fixtures/expenses.js';
import db from '../../../src/db';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Expenses redux state tests', () => {
  let createExpenseStub;
  let readExpensesStub;
  let readExpenseStub;
  let updateExpenseStub;
  let deleteExpenseStub;

  beforeEach(() => {
    createExpenseStub = sinon.stub(db, 'createExpense');
    readExpensesStub = sinon.stub(db, 'readExpenses');
    readExpenseStub = sinon.stub(db, 'readExpense');
    updateExpenseStub = sinon.stub(db, 'updateExpense');
    deleteExpenseStub = sinon.stub(db, 'deleteExpense');
  });

  afterEach(() => {
    createExpenseStub.restore();
    readExpensesStub.restore();
    readExpenseStub.restore();
    updateExpenseStub.restore();
    deleteExpenseStub.restore();
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
      uid: 'uid',
      expenseId: expenses[1].id
    };
    const previousState = [expenses[0], expenses[1], expenses[2]];
    expect(reducer(previousState, removeExpense(payload))).toEqual([expenses[0], expenses[2]]);
  });

  it('Should create expense', async () => {
    const mockDbExpenses = [];
    createExpenseStub.callsFake(async (uid, expense) => {
      mockDbExpenses.push(expense);
    });

    const store = mockStore({});
    const uid = 'uid';
    const expense = expenses[2];
    const action = createExpense({
      uid, 
      expense: expenses[2]
    });
    await store.dispatch(action);
    const actions = store.getActions();
    expect(actions[0].type).toEqual('expenses/createExpense/pending');
    expect(actions[1].type).toEqual('expenses/createExpense/fulfilled');

    expect(mockDbExpenses).toEqual([expense]);
  });

  it('Should read expenses', async () => {
    const mockDbExpenses = [...expenses];
    readExpensesStub.callsFake(async (uid) => {
      return mockDbExpenses;
    });

    const store = mockStore({});
    const uid = 'uid';
    const action = readExpenses({
      uid
    });
    await store.dispatch(action);
    const actions = store.getActions();
    expect(actions[0].type).toEqual('expenses/readExpenses/pending');
    expect(actions[1].type).toEqual('expenses/readExpenses/fulfilled');
  });

  it('Should update expense', async () => {
    let mockDbExpense = undefined;
    updateExpenseStub.callsFake(async (uid, expense) => {
      mockDbExpense = expense;
    });

    const store = mockStore({});
    const uid = 'uid';
    const updatedExpense = {
      ...expenses[2],
      description: 'Phone Bill'
    };
    const action = updateExpense({
      uid, 
      expense: updatedExpense,
    });
    await store.dispatch(action);
    const actions = store.getActions();
    expect(actions[0].type).toEqual('expenses/updateExpense/pending');
    expect(actions[1].type).toEqual('expenses/updateExpense/fulfilled');

    expect(mockDbExpense).toEqual(updatedExpense);
  });

  it('Should delete expense', async () => {
    let mockDeletedId = undefined;
    deleteExpenseStub.callsFake(async (uid, expenseId) => {
      mockDeletedId = expenseId;
    });

    const store = mockStore({});
    const uid = 'uid';
    const expense = expenses[2];
    const action = deleteExpense({
      uid,
      expenseId: expense.id,
    });
    await store.dispatch(action);
    const actions = store.getActions();
    expect(actions[0].type).toEqual('expenses/deleteExpense/pending');
    expect(actions[1].type).toEqual('expenses/deleteExpense/fulfilled');

    expect(mockDeletedId).toEqual(expense.id);
  });
});
