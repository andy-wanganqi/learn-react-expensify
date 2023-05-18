/**
 * @jest-environment jsdom
 */
import moment from 'moment';
import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ExpenseForm from '../../src/components/ExpenseForm.jsx';
import expenses from '../fixtures/expenses.js';
import { renderWith } from '../utils.js';

describe('ExpenseForm component tests', () => {
  beforeAll(() => {
  })

  it('Should render ExpenseForm without expense', async () => {
    renderWith(<ExpenseForm />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    expect(screen.getByText('Save Expense')).toBeInTheDocument();
    expect(screen.queryByText('Remove Expense')).not.toBeInTheDocument();
  });

  it('Should render ExpenseForm with expense', async () => {
    renderWith(<ExpenseForm expense={expenses[2]}/>, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    expect(screen.getByText('Save Expense')).toBeInTheDocument();
    expect(screen.queryByText('Remove Expense')).toBeInTheDocument();
  });

  it('Should render error message', async () => {
    renderWith(<ExpenseForm />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', {name: /Save/i}));
    expect(screen.queryByText('Please provide description and amount.')).toBeInTheDocument();
  });

  it('Should update description value after user typing', async () => {
    renderWith(<ExpenseForm />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Description', { name: /description/i }), 'Council Bill');
    expect(screen.getByPlaceholderText('Description', { name: /description/i })).toHaveValue('Council Bill');
  });

  it('Should update note value after user typing', async () => {
    renderWith(<ExpenseForm />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Note (optional)'), 'Monthly');
    expect(screen.getByPlaceholderText('Note (optional)')).toHaveValue('Monthly');
  });

  it('Should update amount value after user typing correct number', async () => {
    renderWith(<ExpenseForm />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Amount'), '560.');
    expect(screen.getByPlaceholderText('Amount')).toHaveValue('560.');
  });

  it('Should update amount value after user typing incorrect number', async () => {
    renderWith(<ExpenseForm />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    const user = userEvent.setup();
    const amountField = screen.getByPlaceholderText('Amount');
    await user.type(amountField, 'ab560..501');
    expect(amountField).toHaveValue('560.50');
  });

  it('Should update createdAt value after user typing', async () => {
    renderWith(<ExpenseForm />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    const createdAtField = screen.getByPlaceholderText('Created At');
    fireEvent.mouseDown(createdAtField);
    fireEvent.change(createdAtField, { target: { value: '20/05/2023' } });
    expect(createdAtField).toHaveValue('20/05/2023');
  });

  it('Should save expense by clicking button', async () => {
    const handleSaveExpense = jest.fn();
    renderWith(<ExpenseForm handleSaveExpense={handleSaveExpense} />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Description', { name: /description/i }), 'Council Bill');
    await user.type(screen.getByPlaceholderText('Amount', { name: /amount/i }), '560.50');
    await user.click(screen.getByRole('button', {name: /Save/i}));
    
    await waitFor(() =>
      expect(handleSaveExpense).toHaveBeenCalledWith({
        description: 'Council Bill',
        amount: 56050,
        note: '',
        createdAt: moment().startOf('day').valueOf(),
      }),
    );
  });

  it('Should render expense', async () => {
    const expense = expenses[2];
    const { description, note, amount, createdAt } = expense;
    renderWith(<ExpenseForm expense={expense} />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    expect(screen.getByPlaceholderText('Description')).toHaveValue(description);
    expect(screen.getByPlaceholderText('Note (optional)')).toHaveValue(note);
    expect(screen.getByPlaceholderText('Amount')).toHaveValue((parseFloat(amount) / 100).toString());
    expect(screen.getByPlaceholderText('Created At')).toHaveValue(moment(createdAt).format('DD/MM/yyyy'));
  });

  it('Should remove expense by clicking button', async () => {
    const expense = expenses[2];
    const handleRemoveExpense = jest.fn();
    renderWith(<ExpenseForm expense={expense} handleRemoveExpense={handleRemoveExpense} />, {
      preloadedState: {
        filters: {},
        expenses
      },
      withProvider: true,
    });
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', {name: /Remove/i}));
    await waitFor(() =>
      expect(handleRemoveExpense).toHaveBeenCalled(),
    );
    expect(screen.queryByText('Please provide description and amount.')).not.toBeInTheDocument();
  });


});
