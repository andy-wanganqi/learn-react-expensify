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

import config from './config.js';
const { FIREBASE_PROJECT, FIREBASE_API_KEY } = config;
console.log('FIREBASE_PROJECT', FIREBASE_PROJECT);
console.log('FIREBASE_API_KEY', FIREBASE_API_KEY);

import { writeUser } from './db/firebase.js';
writeUser('36af97fd-6109-40cc-8a19-0e3f2f12ea67', 'Andy');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createStore()}>
    <AppRouter />
  </Provider>
);
