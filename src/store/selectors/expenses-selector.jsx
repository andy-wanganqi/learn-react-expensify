export const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((a) => 
    (typeof startDate !== 'number' || a.createdAt >= startDate)
    && (typeof endDate !== 'number' || a.createdAt <= endDate)
    && (typeof text !== 'string' || a.description.toLowerCase().includes(text.toLowerCase()))
  ).sort((a, b) => {
    console.log('sortBy = ', sortBy)
    console.log('a[sortBy] = ', a[sortBy])
    return a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0
  })
}
