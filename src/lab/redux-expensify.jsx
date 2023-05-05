import { createStore, combineReducers } from 'redux'

// Expenses Manager: Add / Edit / Remove
// Expenses View: Filter (text / start date / end date) / Sort (date / amount)

const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const filterReducerDefaultState = {
  text: '',
  sortBy: 'amount',
  startDate: undefined,
  endDate: undefined,
}
const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const reducers = combineReducers({
  expenses: expensesReducer,
  filter: filterReducer,
})
const store = createStore(reducers)


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
