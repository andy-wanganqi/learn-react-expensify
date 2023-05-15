import { createStore, combineReducers } from 'redux';
import { expensesReducer } from './reducers/expenses-reducer.jsx';
import { filtersReducer } from './reducers/filters-reducer.jsx';

export default () => {
  const reducers = combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  });
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
