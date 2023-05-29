/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import sinon from 'sinon';
import DashboardPage from '../../../src/components/pages/DashboardPage.jsx';
import expenses from '../../fixtures/expenses.js';
import filters from '../../fixtures/filters.js';
import { renderWith } from '../../utils.js';
import db from '../../../src/db/index.js';
import { signedInGoogleUser } from '../../fixtures/googleUsers.js';
import { setUser } from '../../../src/store/slices/userSlice.js';

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
    
    const { store } = renderWith(<DashboardPage />, {
      preloadedState: {
        filters,
        expenses
      },
      withProvider: true,
      withRouter: true,
    });
    await act(() => store.dispatch(setUser(signedInGoogleUser)));

    waitFor(() => {
      expect(screen.queryByText(/Add Expense/i)).toBeInTheDocument();
    });
  });

});