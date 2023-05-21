export const selectTotalAmount = ({ expenses }) => {
  if (!expenses || expenses.length == 0) {
    return 0;
  } 
  const sum = expenses
    .map(item => item.amount)
    .reduce((prev, curr) => prev + curr, 0);
  return sum;
};
