import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import moment from 'moment';
import AppRouter from './routes/index.jsx';
import createStore from './store/store.js';
import * as firebase from './firebase';
import auth from './auth';
import { setUser, clearUser } from './store/slices/userSlice.js';
import 'normalize.css/normalize.css';
import "react-datepicker/dist/react-datepicker.css";
import './styles/index.scss';
moment.locale('en-nz');

const initialize = () => {
  firebase.initialize();
  const store = createStore();
  auth.userAuth(
    (user) => {
      store.dispatch(setUser(user));
    }, 
    () => {
      store.dispatch(clearUser());
    }
  );
  return { store };
}

const { store } = initialize();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
