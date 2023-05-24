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

let readExpensesStub = undefined;
describe('DashboardPage tests', () => {
  beforeAll(() => {
    const mockDbExpenses = [...expenses];
    readExpensesStub = sinon.stub(db, 'readExpenses').callsFake(async () => {
      return mockDbExpenses;
    });
  });

  afterAll(() => {
    readExpensesStub.restore();
  });

  it('Should render DashboardPage', async () => {
    renderWith(<DashboardPage />, {
      preloadedState: {
        filters,
        expenses
      },
      withProvider: true,
    });
    expect(screen.queryByText(/Dashboard Page/i)).toBeInTheDocument();
  });

});