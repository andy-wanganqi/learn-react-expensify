import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js';
import filtersReducer from './slices/filtersSlice.js';
import expensesReducer from './slices/expensesSlice.js';

const createStore = (preloadedState) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      filters: filtersReducer,
      expenses: expensesReducer,
    },
    preloadedState,
  });
  return store;  
}

export default createStore;
