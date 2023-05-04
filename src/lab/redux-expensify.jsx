import { createStore, combineReducers } from 'redux'

const state = {
  expenses: [{
    id: '1',
    description: 'October Rent',
    note: 'final payment',
    amount: 54500,
    createdAt: 0,
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  }
}
