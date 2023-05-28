/**
 * @jest-environment jsdom
 */
import moment from 'moment';
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ExpenseListFilters from '../../src/components/ExpenseListFilters.jsx';
import filters from '../fixtures/filters.js';
import { renderWith } from '../utils.js';

describe('ExpenseListFilters component tests', () => {
  beforeAll(() => {
  })
  
  it('Should render ExpenseListFilters with filters', async () => {
    renderWith(<ExpenseListFilters />, {
      preloadedState: {
        filters,
      },
      withProvider: true,
    });
    expect(screen.getByPlaceholderText(/Search expenses/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search expenses/i)).toHaveValue(filters.text);
    const dateRangeText = `${moment(filters.startDate).format("DD/MM/yyyy")} - ${moment(filters.endDate).format("DD/MM/yyyy")}`
    expect(screen.getByPlaceholderText(/Select date range/i)).toHaveValue(dateRangeText);
    expect(screen.getByPlaceholderText(/SortBy/i)).toHaveValue(filters.sortBy);
  });

  it('Should update text value after user typing', async () => {
    const { store } = renderWith(<ExpenseListFilters />, {
      preloadedState: {
        filters,
      },
      withProvider: true,
    });
    const user = userEvent.setup();
    const textField = screen.getByPlaceholderText(/Search expenses/i);
    await user.type(textField, '123');
    const expectText = filters.text + '123';
    expect(textField).toHaveValue(expectText);
    expect(store.getState().filters.text).toBe(expectText);
  });

  it('Should update sort by value after value changed', async () => {
    const { store } = renderWith(<ExpenseListFilters />, {
      preloadedState: {
        filters,
      },
      withProvider: true,
    });
    const sortByField = screen.getByPlaceholderText(/SortBy/i);
    fireEvent.change(sortByField, {target: {value: 'createdAt'}})
    expect(sortByField).toHaveValue('createdAt');
    expect(store.getState().filters.sortBy).toBe('createdAt');
  });

});
