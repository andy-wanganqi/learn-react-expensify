/**
 * @jest-environment jsdom
 */
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import EditExpensePage from '../../../src/components/pages/EditExpensePage.jsx';
import expenses from '../../fixtures/expenses.js';
import { renderWith } from '../../utils.js';
import db from '../../../src/db/index.js';
import { setUser } from '../../../src/store/slices/userSlice.js';
import { signedInGoogleUser } from '../../fixtures/googleUsers.js';

jest.mock('react-router-dom', () => {
  const mockNavigate = jest.fn();
  return ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: () => mockNavigate,
  });
});

describe('EditExpensePage tests', () => {
  let updateExpenseStub;
  let readExpenseStub;
  let deleteExpenseStub;

  beforeEach(() => {
    updateExpenseStub = sinon.stub(db, 'updateExpense');
    readExpenseStub = sinon.stub(db, 'readExpense');
    deleteExpenseStub = sinon.stub(db, 'deleteExpense');
  });

  afterEach(() => {
    updateExpenseStub.restore();
    readExpenseStub.restore();
    deleteExpenseStub.restore();
  });

  it('Should render EditExpensePage (with expense array)', async () => {
    useParams.mockReturnValue({ id: expenses[2].id });

    const { store } = renderWith(<EditExpensePage />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    await act(() => store.dispatch(setUser(signedInGoogleUser)));

    waitFor(() => {
      expect(screen.queryByText(/Edit Expense/i)).toBeInTheDocument();
    });
  });

  it('Should render EditExpensePage when expense exists (without expense array)', async () => {
    useParams.mockReturnValue({ id: expenses[2].id });
    readExpenseStub.callsFake(async (uid, expenseId) => {
      return expenses[2];
    });

    const { store } = renderWith(<EditExpensePage />, {
      preloadedState: {
        filters: {},
        expenses: [],
      },
      withProvider: true,
      withRouter: true,
    });
    await act(() => store.dispatch(setUser(signedInGoogleUser)));

    waitFor(() => {
      expect(screen.queryByText(/Edit Expense/i)).toBeInTheDocument();
    });
  });

  it('Should navigate when expense does not exist (without expense array)', async () => {
    useParams.mockReturnValue({ id: '123' });
    readExpenseStub.callsFake(async (uid, expenseId) => {
      return null;
    });
    const { store } = renderWith(<EditExpensePage />, {
      preloadedState: {
        filters: {},
        expenses: [],
      },
      withProvider: true,
      withRouter: true,
    });
    await act(() => store.dispatch(setUser(signedInGoogleUser)));

    waitFor(() => {
      const navigate = useNavigate();
      expect(navigate).toHaveBeenLastCalledWith('/dashboard');
    });
  });

  it('Should handle save existing expense (with expense array)', async () => {
    const index = 2;
    useParams.mockReturnValue({ id: expenses[index].id });
    let mockDbExpense = undefined;
    updateExpenseStub.callsFake(async (uid, expense) => {
      mockDbExpense = expense;
    });

    const { store } = renderWith(<EditExpensePage />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    await act(() => store.dispatch(setUser(signedInGoogleUser)));

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Description', { name: /description/i }), 'CB');
    await user.type(screen.getByPlaceholderText('Amount', { name: /amount/i }), '1');
    await user.click(screen.getByRole('button', {name: /Save/i}));

    await waitFor(() => {
      const expectExpense = {
        ...expenses[index],
        description: expenses[index].description + 'CB',
        amount: 45100,
      };
      expect(store.getState().expenses[index]).toMatchObject(expectExpense);
      expect(mockDbExpense).toMatchObject(expectExpense);
    });
  });

  it('Should navigate when expense does not exist (with expense array)', async () => {
    useParams.mockReturnValue({ id: '123' });
    const { store } = renderWith(<EditExpensePage />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    await act(() => store.dispatch(setUser(signedInGoogleUser)));

    const navigate = useNavigate();
    expect(navigate).toHaveBeenLastCalledWith('/dashboard');
  });

  it('Should handle remove existing expense (with expense array)', async () => {
    const index = 2;
    useParams.mockReturnValue({ id: expenses[index].id });
    let mockDeletedId = undefined;
    deleteExpenseStub.callsFake(async (uid, expenseId) => {
      mockDeletedId = expenseId;
    });

    const { store } = renderWith(<EditExpensePage />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    await act(() => store.dispatch(setUser(signedInGoogleUser)));

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', {name: /Remove/i}));

    await waitFor(() => {
      const navigate = useNavigate();
      expect(navigate).toHaveBeenLastCalledWith('/dashboard');
  
      const expectExpenses = [...expenses];
      expectExpenses.splice(2, 1)
      expect(store.getState().expenses).toEqual(expectExpenses);
      expect(mockDeletedId).toEqual(expenses[index].id);
    });
  });
});
