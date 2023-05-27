import React from "react";
import { useSelector } from 'react-redux';
import { selectFilteredExpenses } from '../store/selectors/expenses.js';
import { selectTotalAmount } from '../store/selectors/expensesAggregate.js';
import { formatAmount } from '../utils/amountConvert.js';

const ExpenseSummary = () => {
  const expenses = useSelector((state) => state.expenses);
  const filters = useSelector((state) => state.filters);
  const filteredExpenses = selectFilteredExpenses({ expenses, filters });
  const count = filteredExpenses.length;
  const total = selectTotalAmount({ expenses: filteredExpenses });
  return (
    <div className="page_footer">
      <div className="content-container">
        <h1>Viewing <span>{count}</span> expense{count > 1 && 's'} totalling <span>{formatAmount(total)}</span></h1>
      </div>
    </div>
  );
};

export default ExpenseSummary;
