import moment from 'moment';

export const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((a) => 
    (!startDate || a.createdAt >= moment(startDate).valueOf())
    && (!endDate || a.createdAt <= moment(endDate).valueOf())
    && (typeof text !== 'string' || a.description.toLowerCase().includes(text.toLowerCase()))
  ).sort((a, b) => {
    return a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0
  });
};
