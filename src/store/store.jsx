import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './slices/filtersSlice.jsx';
import expensesReducer from './slices/expensesSlice.jsx';

const createStore = () => {
  const store = configureStore({
    reducer: {
      filters: filtersReducer,
      expenses: expensesReducer,
    },
  });
  return store;  
}

export default createStore;
