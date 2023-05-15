const defaultExpensesOfState = [];
export const expensesReducer = (expensesOfState = defaultExpensesOfState, action) => {
  const newExpense = action.expense;
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...expensesOfState, newExpense];
    case 'EDIT_EXPENSE':
      return expensesOfState.map((a) => a.id === newExpense.id 
        ? { ...a, ...newExpense }
        : a
      );
    case 'REMOVE_EXPENSE':
      return expensesOfState.filter((a) => a.id !== action.id);
    default:
      return expensesOfState;
  }
};
