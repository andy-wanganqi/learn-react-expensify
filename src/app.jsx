import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import moment from 'moment';
import AppRouter from './routes/app-router.jsx';
import configureStore from './store/configure-store.jsx';

import { addExpense } from './store/actions/expenses-actions.jsx';
import 'normalize.css/normalize.css';
import './styles/index.scss';

moment.locale('en-nz');

const store = configureStore();
store.dispatch(addExpense({ description: 'Water bill', amount: 9000, createdAt: 20230505 }));
store.dispatch(addExpense({ description: 'Grocery', amount: 20000, createdAt: 20230506 }));
store.dispatch(addExpense({ description: 'Contact bill', amount: 18000, createdAt: 20230508 }));

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.createRoot(document.getElementById('root'))
  .render(app);
