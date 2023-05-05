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
  id,
  description = '', 
  note = '', 
  amount = 0, 
  createdAt = 0 
} = {}) => ({
  type: 'EDIT_EXPENSE',
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

const defaultExpenses = []
const expensesReducer = (expenses = defaultExpenses, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...expenses, action.expense]
    case 'EDIT_EXPENSE':
      return expenses.map((a) => a.id === action.expense.id 
        ? { ...a, ...action }
        : a
      )
    case 'REMOVE_EXPENSE':
      return expenses.filter((a) => a.id !== action.id)
    default:
      return expenses
  }
}

// Expenses View: Filter (text / start date / end date) / Sort (date / amount)
const setFilterText = (text = '') => ({
  type: 'SET_FILTER_TEXT',
  text,
})


const defaultFilter = {
  text: '',
  sortBy: 'amount',
  startDate: undefined,
  endDate: undefined,
}
const filterReducer = (filter = defaultFilter, action) => {
  switch (action.type) {
    case 'SET_FILTER_TEXT':
      return {
        ...defaultFilter,
        text: action.text || ''
      }
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
store.dispatch(editExpense({
  ...expense2,
  description: 'long black'
}))

store.dispatch(setFilterText('rent'))
store.dispatch(setFilterText())

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
