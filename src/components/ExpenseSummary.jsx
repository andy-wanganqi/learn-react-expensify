import React from "react";
import { useSelector } from 'react-redux';
import { selectFilteredExpenses } from '../store/selectors/expenses.jsx';
import { selectTotalAmount } from '../store/selectors/expensesAggregate.jsx';

const ExpenseSummary = () => {
  const expenses = useSelector((state) => state.expenses);
  const filters = useSelector((state) => state.filters);
  const filteredExpenses = selectFilteredExpenses({ expenses, filters });
  const count = filteredExpenses.length;
  const total = selectTotalAmount({ expenses: filteredExpenses });
  return (
    <div>
      <p>Viewing {count} expense(s) totalling {(parseFloat(total) / 100).toString()}</p>
    </div>
  );
};

export default ExpenseSummary;
