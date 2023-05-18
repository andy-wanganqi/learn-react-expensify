import moment from 'moment';
import { selectFilteredExpenses } from '../../../src/store/selectors/expensesSelector.jsx';
import expenses from '../../fixtures/expenses.js';

describe('Expenses selector tests', () => {
  beforeAll(() => {
  })
  
  it('Should filter by text', () => {
    const filters = {
      text: 'Bill',
      sortBy: 'createdAt',
    };
    const result = selectFilteredExpenses({ expenses, filters });
    expect(result).toEqual([ expenses[4], expenses[3] ]);
  });
  
  it('Should filter by start date', () => {
    const filters = {
      sortBy: 'createdAt',
      startDate: moment(2000).toDate(),
      endDate: undefined,
    };
    const result = selectFilteredExpenses({ expenses, filters });
    expect(result).toEqual([ expenses[2], expenses[4], expenses[3] ]);
  });
  
  it('Should filter by end date', () => {
    const filters = {
      sortBy: 'createdAt',
      startDate: undefined,
      endDate: moment(2000).toDate(),
    };
    const result = selectFilteredExpenses({ expenses, filters });
    expect(result).toEqual([ expenses[0], expenses[1], expenses[2] ]);
  });
  
  it('Should filter by start date and end date', () => {
    const filters = {
      sortBy: 'createdAt',
      startDate: moment(1000).toDate(),
      endDate: moment(3000).toDate(),
    };
    const result = selectFilteredExpenses({ expenses, filters });
    expect(result).toEqual([ expenses[1], expenses[2], expenses[4] ]);
  });
  
  it('Should filter by nothing', () => {
    const filters = {
      sortBy: 'createdAt',
    };
    const result = selectFilteredExpenses({ expenses, filters });
    expect(result).toEqual([ expenses[0], expenses[1], expenses[2], expenses[4], expenses[3] ]);
  });
  
  it('Should sort by description', () => {
    const filters = {
      sortBy: 'description',
    };
    const result = selectFilteredExpenses({ expenses, filters });
    expect(result).toEqual([ expenses[2], expenses[0], expenses[3], expenses[1], expenses[4] ]);
  });
  
  it('Should sort by note', () => {
    const filters = {
      sortBy: 'note',
    };
    const result = selectFilteredExpenses({ expenses, filters });
    expect(result).toEqual([ expenses[1], expenses[2], expenses[3], expenses[4], expenses[0] ]);
  });
  
  it('Should sort by amount', () => {
    const filters = {
      sortBy: 'amount',
    };
    const result = selectFilteredExpenses({ expenses, filters });
    expect(result).toEqual([ expenses[0], expenses[2], expenses[4], expenses[3], expenses[1] ]);
  });
  
  it('Should sort by createdAt', () => {
    const filters = {
      sortBy: 'createdAt',
    };
    const result = selectFilteredExpenses({ expenses, filters });
    expect(result).toEqual([ expenses[0], expenses[1], expenses[2], expenses[4], expenses[3] ]);
  });
  
  it('Should sort by nothing', () => {
    const filters = {};
    const result = selectFilteredExpenses({ expenses, filters });
    expect(result).toEqual(expenses);
  });
});
