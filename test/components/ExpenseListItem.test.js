/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseListItem from '../../src/components/ExpenseListItem.jsx';
import expenses from '../fixtures/expenses.js';
import { renderWith } from '../utils.js';

describe('ExpenseListItem component tests', () => {
  beforeAll(() => {
  })

  it('Should render ExpenseListItem', async () => {
    renderWith(<ExpenseListItem expense={expenses[2]}/>, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    expect(screen.queryByText(expenses[2].description)).toBeInTheDocument();
  });
});
