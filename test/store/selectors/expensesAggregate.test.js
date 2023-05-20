import { selectTotalAmount } from '../../../src/store/selectors/expensesAggregate.jsx';
import expenses from '../../fixtures/expenses.js';

describe('Expenses Aggregate selector tests', () => {
  beforeAll(() => {
  })
  
  it('Should return 0 if there is no expense', () => {
    const total = selectTotalAmount({ expenses: [] });
    expect(total).toBe(0);
  });

  it('Should return the amount of the only expense', () => {
    const total = selectTotalAmount({ expenses: [ expenses[2] ] });
    expect(total).toBe(expenses[2].amount);
  });

  it('Should return the total amount if there are multiple expenses', () => {
    const total = selectTotalAmount({ expenses });
    expect(total).toBe(164195);
  });

});
