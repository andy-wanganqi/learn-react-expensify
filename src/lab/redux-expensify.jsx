import { createStore, combineReducers } from 'redux'
import { v4 as uuid } from 'uuid';

// Expenses Manager: Add / Edit / Remove
const addExpense = ({ 
  description = '', 
  note = '', 
  amount = 0, 
  createdAt = 0 
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  }
})
const editExpense = ({
  id: undefined,
  description = '', 
  note = '', 
  amount = 0, 
  createdAt = 0 
} = {}) => ({
  type: 'EDIT_EXPENSE',
  id,
  expense: {
    id,
    description,
    note,
    amount,
    createdAt,
  }
})
const removeExpense = ({
  id,
} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
})
// Expenses View: Filter (text / start date / end date) / Sort (date / amount)

const defaultExpenses = []
const expensesReducer = (expenses = defaultExpenses, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      //return expenses.concat(action.expense)
      return [...expenses, action.expense]
    case 'EDIT_EXPENSE':
      const index = expenses.findIndex((a) => a.id === action.id)
      return expenses
    case 'REMOVE_EXPENSE':
      return expenses.filter((a) => a.id !== action.id)
    default:
      return expenses
  }
}

const defaultFilter = {
  text: '',
  sortBy: 'amount',
  startDate: undefined,
  endDate: undefined,
}
const filterReducer = (filter = defaultFilter, action) => {
  switch (action.type) {
    default:
      return filter
  }
}

const reducers = combineReducers({
  expenses: expensesReducer,
  filter: filterReducer,
})
const store = createStore(reducers)
store.subscribe(() => {
  console.log(store.getState())
})

const expense1 = store.dispatch(addExpense({ description: 'rent', amount: 100 }))
const expense2 = store.dispatch(addExpense({ description: 'coffee', amount: 300 }))
store.dispatch(removeExpense({ id: expense1.id }))
store.dispatch(removeExpense({ id: uuid() }))

const demoState = {
  expenses: [{
    id: '1',
    description: 'October Rent',
    note: 'final payment',
    amount: 54500,
    createdAt: 0,
  }],
  filter: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  }
}
