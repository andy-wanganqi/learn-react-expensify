/**
 * @jest-environment jsdom
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../../src/components/layout/header.jsx';

test('Should render Header', async () => {
  render(<Header />, { wrapper: BrowserRouter });
  expect(screen.getByText('Expensify')).toBeInTheDocument();
  expect(screen.getByText('Go home')).toBeInTheDocument();
  expect(screen.getByText('Add Expense')).toBeInTheDocument();
  expect(screen.getByText('Help')).toBeInTheDocument();
});
