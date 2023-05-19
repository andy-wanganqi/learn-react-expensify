/**
 * @jest-environment jsdom
 */
import moment from 'moment';
import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
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
    expect(screen.getByText(/Filter by/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Text/i)).toHaveValue(filters.text);
    expect(screen.getByPlaceholderText(/StartDate/i)).toHaveValue(moment(filters.startDate).format("DD/MM/yyyy"));
    expect(screen.getByPlaceholderText(/EndDate/i)).toHaveValue(moment(filters.endDate).format("DD/MM/yyyy"));
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
    const textField = screen.getByPlaceholderText(/Text/i);
    await user.type(textField, '123');
    const expectText = filters.text + '123';
    expect(textField).toHaveValue(expectText);
    expect(store.getState().filters.text).toBe(expectText);
  });

  it('Should update start date value after value changed', async () => {
    const { store } = renderWith(<ExpenseListFilters />, {
      preloadedState: {
        filters,
      },
      withProvider: true,
    });
    const startDateField = screen.getByPlaceholderText(/StartDate/i);
    fireEvent.change(startDateField, {target: {value: '01/01/2023'}})
    expect(startDateField).toHaveValue('01/01/2023');
    expect(store.getState().filters.startDate).toBe(moment('2023-01-01').valueOf());
  });

  it('Should update end date value after value changed', async () => {
    const { store } = renderWith(<ExpenseListFilters />, {
      preloadedState: {
        filters,
      },
      withProvider: true,
    });
    const endDateField = screen.getByPlaceholderText(/EndDate/i);
    fireEvent.change(endDateField, {target: {value: '11/12/2023'}})
    expect(endDateField).toHaveValue('11/12/2023');
    expect(store.getState().filters.endDate).toBe(moment('2023-12-11').valueOf());
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
