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
    expect(screen.queryByText('5')).toBeInTheDocument();
    expect(screen.queryByText('$1,641.95')).toBeInTheDocument();
  });

  it('Should render ExpenseSummary with filtered expenses', async () => {
    renderWith(<ExpenseSummary />, {
      preloadedState: {
        filters: {
          text: 'Bill'
        },
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    expect(screen.queryByText('2')).toBeInTheDocument();
    expect(screen.queryByText('$500.00')).toBeInTheDocument();
  });
});
