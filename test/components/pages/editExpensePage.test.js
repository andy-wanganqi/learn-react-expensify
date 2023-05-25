/**
 * @jest-environment jsdom
 */
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import EditExpensePage from '../../../src/components/pages/editExpensePage.jsx';
import expenses from '../../fixtures/expenses.js';
import { renderWith } from '../../utils.js';
import db from '../../../src/db';
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
  let deleteExpenseStub;

  beforeEach(() => {
    updateExpenseStub = sinon.stub(db, 'updateExpense');
    deleteExpenseStub = sinon.stub(db, 'deleteExpense');
  });

  afterEach(() => {
    updateExpenseStub.restore();
    deleteExpenseStub.restore();
  });

  it('Should render EditExpensePage', async () => {
    useParams.mockReturnValue({ id: expenses[2].id });

    renderWith(<EditExpensePage />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    expect(screen.queryByText(/Edit Expense Page/i)).toBeInTheDocument();
  });

  it('Should handle save existing expense', async () => {
    let mockDbExpense = undefined;
    updateExpenseStub.callsFake(async (uid, expense) => {
      mockDbExpense = expense;
    });

    const index = 2;
    useParams.mockReturnValue({ id: expenses[index].id });
    const { store } = renderWith(<EditExpensePage />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
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

  it('Should navigate when expense does not exist', async () => {
    useParams.mockReturnValue({ id: '123' });
    renderWith(<EditExpensePage />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });

    const navigate = useNavigate();
    expect(navigate).toHaveBeenLastCalledWith('/');
  });

  it('Should handle remove existing expense', async () => {
    let mockDeletedId = undefined;
    deleteExpenseStub.callsFake(async (uid, expenseId) => {
      mockDeletedId = expenseId;
    });

    const index = 2;
    useParams.mockReturnValue({ id: expenses[index].id });
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
      expect(navigate).toHaveBeenLastCalledWith('/');
  
      const expectExpenses = [...expenses];
      expectExpenses.splice(2, 1)
      expect(store.getState().expenses).toEqual(expectExpenses);
      expect(mockDeletedId).toEqual(expenses[index].id);
    });
  });
});
