/**
 * @jest-environment jsdom
 */
import moment from 'moment';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import AddExpensePage from '../../../src/components/pages/addExpensePage.jsx';
import expenses from '../../fixtures/expenses.js';
import { renderWith } from '../../utils.js';
import * as db from '../../../src/db';

describe('AddExpensePage tests', () => {
  beforeAll(() => {
  })

  it('Should render AddExpensePage without expense', async () => {
    renderWith(<AddExpensePage />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    expect(screen.queryByText(/Add Expense Page/i)).toBeInTheDocument();
  });

  it('Should handle save new expense', async () => {
    const mockDbExpenses = [];
    const createExpenseAsyncStub = sinon.stub(db, 'createExpenseAsync').callsFake(async (expense) => {
      mockDbExpenses.push(expense);
    });

    const { store } = renderWith(<AddExpensePage />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Description', { name: /description/i }), 'Council Bill');
    await user.type(screen.getByPlaceholderText('Amount', { name: /amount/i }), '560.50');
    await user.click(screen.getByRole('button', {name: /Save/i}));

    await waitFor(() => {
      const updatedExpenses = store.getState().expenses;
      expect(updatedExpenses.length).toBe(6);
      expect(updatedExpenses[updatedExpenses.length - 1]).toMatchObject({
        id: expect.any(String),
        description: 'Council Bill',
        amount: 56050,
        note: '',
        createdAt: moment().startOf('day').valueOf(),
      });
      expect(mockDbExpenses.length).toBe(1);
      createExpenseAsyncStub.restore();
    });
  });
});
