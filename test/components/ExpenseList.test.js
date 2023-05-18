/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseList from '../../src/components/ExpenseList.jsx';
import expenses from '../fixtures/expenses.js';
import { renderWith } from '../utils.js';

describe('ExpensesList component tests', () => {
  beforeAll(() => {
  })

  it('Should render ExpenseList with expenses', async () => {
    renderWith(<ExpenseList />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    expect(screen.getByText('Expense List')).toBeInTheDocument();
    expect(screen.queryByText('There is no expenses.')).not.toBeInTheDocument();
    expenses.forEach(expense => {
      expect(screen.getByText(expense.description)).toBeInTheDocument();
    })
  });
  
  it('Should render ExpenseList without expenses', async () => {
    renderWith(<ExpenseList />, {
      withProvider: true,
    });
    expect(screen.getByText('There is no expenses.')).toBeInTheDocument();
  });
  
  // Todo: It should navigate to expense item page after click the item link

  // Todo: It should navigate to expense item page after click the edit button

  // Todo: It should remove the item after click the remove button
  
});

