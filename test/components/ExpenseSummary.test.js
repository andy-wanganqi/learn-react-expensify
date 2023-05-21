/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseSummary from '../../src/components/ExpenseSummary.jsx';
import expenses from '../fixtures/expenses.js';
import { renderWith } from '../utils.js';

describe('ExpensesList component tests', () => {
  beforeAll(() => {
  })

  it('Should render ExpenseSummary with expenses', async () => {
    renderWith(<ExpenseSummary />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    expect(screen.getByText(/Viewing 5/i)).toBeInTheDocument();
  });
});
