import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import AppRouter from './routes/app-router.jsx'
import configureStore from './store/configure-store.jsx'

import { addExpense } from './store/actions/expenses-actions.jsx'
import { setFilterText } from './store/actions/filters-actions.jsx'
import { getVisibleExpenses } from './store/selectors/expenses-selector.jsx'

import 'normalize.css/normalize.css'
import './styles/index.scss'

const store = configureStore()
store.dispatch(addExpense({ description: 'Water bill' }))
store.dispatch(addExpense({ description: 'Gas bill' }))
store.dispatch(setFilterText('gas'))

const state = store.getState()
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
console.log(visibleExpenses)

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)
ReactDOM.createRoot(document.getElementById('root'))
  .render(app);
