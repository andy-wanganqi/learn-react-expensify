import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './slices/filtersSlice.js';
import expensesReducer from './slices/expensesSlice.js';

const createStore = (preloadedState) => {
  const store = configureStore({
    reducer: {
      filters: filtersReducer,
      expenses: expensesReducer,
    },
    preloadedState,
  });
  return store;  
}

export default createStore;