/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import sinon from 'sinon';
import ExpenseList from '../../src/components/ExpenseList.jsx';
import expenses from '../fixtures/expenses.js';
import { renderWith } from '../utils.js';
import db from '../../src/db';

let readExpensesStub = undefined;
describe('ExpensesList component tests', () => {
  beforeAll(() => {
    const mockDbExpenses = [...expenses];
    readExpensesStub = sinon.stub(db, 'readExpenses').callsFake(async () => {
      return mockDbExpenses;
    });
  });

  afterAll(() => {
    readExpensesStub.restore();
  });

  it('Should render ExpenseList', async () => {
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
  
  // Todo: It should navigate to expense item page after click the item link

  // Todo: It should navigate to expense item page after click the edit button

  // Todo: It should remove the item after click the remove button
  
});

