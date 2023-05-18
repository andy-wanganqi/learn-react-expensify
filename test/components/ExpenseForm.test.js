/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseForm from '../../src/components/ExpenseForm.jsx';
import expenses from '../fixtures/expenses.js';
import { renderWith } from '../utils.js';

describe('ExpenseForm component tests', () => {
  beforeAll(() => {
  })

  it('Should render ExpenseForm without expense', async () => {
    renderWith(<ExpenseForm />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    expect(screen.getByText('Save Expense')).toBeInTheDocument();
    expect(screen.queryByText('Remove Expense')).not.toBeInTheDocument();
  });

  it('Should render ExpenseForm with expense', async () => {
    renderWith(<ExpenseForm expense={expenses[2]}/>, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    expect(screen.getByText('Save Expense')).toBeInTheDocument();
    expect(screen.queryByText('Remove Expense')).toBeInTheDocument();
  });
});
