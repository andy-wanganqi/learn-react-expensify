/**
 * @jest-environment jsdom
 */
import moment from 'moment';
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from '../../../src/components/pages/dashboardPage.jsx';
import expenses from '../../fixtures/expenses.js';
import filters from '../../fixtures/filters.js';
import { renderWith } from '../../utils.js';

describe('DashboardPage tests', () => {
  beforeAll(() => {
  })

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