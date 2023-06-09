export const selectFilteredExpenses = ({ expenses, filters }) => {
  const { text, startDate, endDate, sortBy } = filters;
  const filteredExpenses = expenses.filter((a) => 
    (!startDate || a.createdAt >= startDate)
    && (!endDate || a.createdAt <= endDate)
    && (typeof text !== 'string' || a.description.toLowerCase().includes(text.toLowerCase()))
  );
  if (sortBy) {
    filteredExpenses.sort((a, b) => {
      return a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0
    });
  }
  return filteredExpenses;
};
