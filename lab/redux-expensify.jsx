import { createStore, combineReducers } from 'redux';
import { v4 as uuid } from 'uuid';

// Expenses Manager: Add / Edit / Remove
const addExpense = ({ 
  description = '', 
  note = '', 
  amount = 0, 
  createdAt = 0 
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  }
});
const editExpense = ({
  id,
  description = '', 
  note = '', 
  amount = 0, 
  createdAt = 0 
} = {}) => ({
  type: 'EDIT_EXPENSE',
  expense: {
    id,
    description,
    note,
    amount,
    createdAt,
  }
});
const removeExpense = ({
  id,
} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

const defaultExpenses = [];
const expensesReducer = (expenses = defaultExpenses, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...expenses, action.expense];
    case 'EDIT_EXPENSE':
      return expenses.map((a) => a.id === action.expense.id 
        ? { ...a, ...action }
        : a
      );
    case 'REMOVE_EXPENSE':
      return expenses.filter((a) => a.id !== action.id);
    default:
      return expenses;
  }
};

// Expenses View: Filter (text / start date / end date) / Sort (date / amount)
const setFilterText = (text = '') => ({
  type: 'SET_FILTER_TEXT',
  text,
});
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});
const sortByCreatedAt = () => ({
  type: 'SORT_BY_CREATEDAT'
});
const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
});
const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
});


const defaultFilter = {
  text: '',
  sortBy: 'amount',
  startDate: undefined,
  endDate: undefined,
};
const filterReducer = (filter = defaultFilter, action) => {
  switch (action.type) {
    case 'SET_FILTER_TEXT':
      return {
        ...filter,
        text: action.text || ''
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...filter,
        sortBy: 'amount',
      };
    case 'SORT_BY_CREATEDAT':
      return {
        ...filter,
        sortBy: 'createdAt',
    };
    case 'SET_START_DATE':
      return {
        ...filter,
        startDate: action.date,
      };
    case 'SET_END_DATE':
      return {
        ...filter,
        endDate: action.date,
      };
    default:
      return filter;
  }
};

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((a) => 
    (typeof startDate !== 'number' || a.createdAt >= startDate)
    && (typeof endDate !== 'number' || a.createdAt <= endDate)
    && (typeof text !== 'string' || a.description.toLowerCase().includes(text.toLowerCase()))
  ).sort((a, b) => a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0);
};

const reducers = combineReducers({
  expenses: expensesReducer,
  filter: filterReducer,
});
const store = createStore(reducers);
store.subscribe(() => {
  console.log(store.getState())
});

const expense1 = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: 1000 }));
const expense2 = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: 2000 }));
store.dispatch(removeExpense({ id: expense1.id }));
store.dispatch(removeExpense({ id: uuid() }));
store.dispatch(editExpense({
  ...expense2,
  description: 'long black'
}));

store.dispatch(setFilterText('rent'));
store.dispatch(setFilterText());
store.dispatch(sortByAmount());
store.dispatch(sortByCreatedAt());
store.dispatch(setStartDate(1250));
store.dispatch(setEndDate(2500));
store.dispatch(setStartDate());
store.dispatch(setEndDate());

const demoState = {
  expenses: [{
    id: '1',
    description: 'October Rent',
    note: 'final payment',
    amount: 54500,
    createdAt: 0,
  }],
  filter: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  }
};
