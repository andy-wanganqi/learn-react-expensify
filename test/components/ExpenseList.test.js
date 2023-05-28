/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import sinon from 'sinon';
import ExpenseList from '../../src/components/ExpenseList.jsx';
import expenses from '../fixtures/expenses.js';
import { renderWith } from '../utils.js';
import db from '../../src/db';

describe('ExpensesList component tests', () => {
  let readExpensesStub;

  beforeEach(() => {
    readExpensesStub = sinon.stub(db, 'readExpenses');
  });

  afterEach(() => {
    readExpensesStub.restore();
  });

  it('Should render ExpenseList with expenses', async () => {
    const mockDbExpenses = [...expenses];
    readExpensesStub.returns(mockDbExpenses);

    renderWith(<ExpenseList />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });

    await waitFor(() => {
      expect(screen.queryByText(/There is no expenses/i)).not.toBeInTheDocument();
      expenses.forEach(expense => {
        expect(screen.getByText(expense.description)).toBeInTheDocument();
      })
    });
  });

  it('Should render ExpenseList without expenses', async () => {
    const mockDbExpenses = [];
    readExpensesStub.returns(mockDbExpenses);

    renderWith(<ExpenseList />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
      withRouter: true,
    });

    await waitFor(() => {
      expect(screen.queryByText(/There is no expenses/i)).toBeInTheDocument();
    });
  });
});

