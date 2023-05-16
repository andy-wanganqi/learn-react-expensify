import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import moment from 'moment';
import AppRouter from './routes/app-router.jsx';
import configureStore from './store/configure-store.jsx';
import { addExpense } from './store/actions/expenses-actions.jsx';
import 'normalize.css/normalize.css';
import "react-datepicker/dist/react-datepicker.css";
import './styles/index.scss';

moment.locale('en-nz');

const store = configureStore();
store.dispatch(addExpense({ description: 'Water bill', amount: 9000, note: '123', createdAt: 1684005530000 }));
store.dispatch(addExpense({ description: 'Grocery', amount: 20000, createdAt: 1683205530000 }));
store.dispatch(addExpense({ description: 'Contact bill', amount: 18000, createdAt: 1683805530000 }));

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.createRoot(document.getElementById('root'))
  .render(app);
