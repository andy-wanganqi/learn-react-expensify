import React from "react";
import { useSelector } from 'react-redux';
import { selectFilteredExpenses } from '../store/selectors/expenses.js';
import { selectTotalAmount } from '../store/selectors/expensesAggregate.js';
import { formatCurrency } from '../utils/amountConvert.js';

const ExpenseSummary = () => {
  const expenses = useSelector((state) => state.expenses);
  const filters = useSelector((state) => state.filters);
  const filteredExpenses = selectFilteredExpenses({ expenses, filters });
  const count = filteredExpenses.length;
  const total = selectTotalAmount({ expenses: filteredExpenses });
  return (
    <div>
      <p>Viewing {count} expense(s) totalling {formatCurrency(total/100)}</p>
    </div>
  );
};

export default ExpenseSummary;
