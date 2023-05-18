/**
 * @jest-environment jsdom
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExpenseList } from '../../src/components/ExpenseList.jsx';
import expenses from '../fixtures/expenses.js';

test('Should render ExpenseList with expenses', async () => {
  const template = (
    <Provider>
      <ExpenseList expenses={expenses}/>
    </Provider>
  );
  render(template, { wrapper: BrowserRouter });
  expect(screen.getByText('Expense List')).toBeInTheDocument();
  expect(screen.getByText('There is no expenses')).not.toBeInTheDocument();
});

test('Should render ExpenseList without expenses', async () => {
  const template = (
    <Provider>
      <ExpenseList expenses={expenses}/>
    </Provider>
  );
  render(template, { wrapper: BrowserRouter });
  expect(screen.getByText('There is no expenses')).toBeInTheDocument();
});
