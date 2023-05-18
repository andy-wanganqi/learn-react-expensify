import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import moment from 'moment';
import AppRouter from './routes/appRouter.jsx';
import createStore from './store/store.jsx';
import 'normalize.css/normalize.css';
import "react-datepicker/dist/react-datepicker.css";
import './styles/index.scss';

moment.locale('en-nz');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createStore()}>
    <AppRouter />
  </Provider>
);
