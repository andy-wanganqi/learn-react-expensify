import { createStore, combineReducers } from 'redux'
import { expensesReducer } from './reducers/expenses-reducer.jsx'
import { filterReducer } from './reducers/filters-reducer.jsx'

export default () => {
  const reducers = combineReducers({
    expenses: expensesReducer,
    filter: filterReducer,
  })
  const store = createStore(reducers)
  return store
}
