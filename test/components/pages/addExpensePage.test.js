/**
 * @jest-environment jsdom
 */
import moment from 'moment';
import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AddExpensePage from '../../../src/components/pages/addExpensePage.jsx';
import expenses from '../../fixtures/expenses.js';
import { renderWith } from '../../utils.js';

describe('addExpensePage tests', () => {
  beforeAll(() => {
  })

  // Should render addExpensePage
  it('Should render addExpensePage without expense', async () => {
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

    const updatedExpenses = store.getState().expenses;
    expect(updatedExpenses[updatedExpenses.length - 1]).toMatchObject({
      id: expect.any(String),
      description: 'Council Bill',
      amount: 56050,
      note: '',
      createdAt: moment().startOf('day').valueOf(),
    });
  });

});

