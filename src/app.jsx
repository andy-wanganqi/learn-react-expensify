import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import AppRouter from './routes/app-router.jsx'
import configureStore from './store/configure-store.jsx'

import { addExpense } from './store/actions/expenses-actions.jsx'
import { setFilterText } from './store/actions/filters-actions.jsx'
import 'normalize.css/normalize.css'
import './styles/index.scss'

const store = configureStore()
store.dispatch(addExpense({ description: 'Water bill', amount: 90, createdAt: 20230505 }))
store.dispatch(addExpense({ description: 'Grocery', amount: 200, createdAt: 20230506 }))
store.dispatch(addExpense({ description: 'Contact bill', amount: 180, createdAt: 20230508 }))
store.dispatch(setFilterText('bill'))

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)
ReactDOM.createRoot(document.getElementById('root'))
  .render(app);
