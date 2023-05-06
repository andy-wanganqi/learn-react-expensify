const defaultExpensesOfState = []
export const expensesReducer = (expensesOfState = defaultExpensesOfState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...expensesOfState, action.expense]
    case 'EDIT_EXPENSE':
      return expensesOfState.map((a) => a.id === action.expense.id 
        ? { ...a, ...action }
        : a
      )
    case 'REMOVE_EXPENSE':
      return expensesOfState.filter((a) => a.id !== action.id)
    default:
      return expensesOfState
  }
}
