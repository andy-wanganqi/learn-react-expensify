/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import sinon from 'sinon';
import DashboardPage from '../../../src/components/pages/dashboardPage.jsx';
import expenses from '../../fixtures/expenses.js';
import filters from '../../fixtures/filters.js';
import { renderWith } from '../../utils.js';
import db from '../../../src/db';

describe('DashboardPage tests', () => {
  let readExpensesStub;
  
  beforeEach(() => {
    readExpensesStub = sinon.stub(db, 'readExpenses');
  });

  afterEach(() => {
    readExpensesStub.restore();
  });

  it('Should render DashboardPage', async () => {
    const mockDbExpenses = [...expenses];
    readExpensesStub.callsFake(async () => {
      return mockDbExpenses;
    });
    
    renderWith(<DashboardPage />, {
      preloadedState: {
        filters,
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    expect(screen.queryByText(/Add Expense/i)).toBeInTheDocument();
  });

});