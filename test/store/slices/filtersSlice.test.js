import moment from 'moment';
import { setFilterText, setSortBy, setStartDate, setEndDate } from '../../../src/store/slices/filtersSlice.jsx';
import createStore from '../../../src/store/store.jsx';

describe('Filters redux state tests', () => {
  beforeAll(() => {
  })
  
  it('Should initialize filters', () => {
    const store = createStore();
    const state = store.getState();
    expect(state.filters).toEqual({
      text: '',
      sortBy: 'amount',
      startDate: moment().startOf('month').valueOf(),
      endDate: moment().endOf('month').valueOf(),
    });
  })

  it('Should set filter text', async () => {
    const store = createStore();
    const result = await store.dispatch(setFilterText('keyword'));
    expect(result.payload).toBe('keyword');
    const state = store.getState();
    expect(state.filters.text).toBe('keyword');
  })

  it('Should set filter sort by', async () => {
    const store = createStore();
    const result = await store.dispatch(setSortBy('description'));
    expect(result.payload).toBe('description');
    const state = store.getState();
    expect(state.filters.sortBy).toBe('description');
  })

  it('Should set filter start date', async () => {
    const store = createStore();
    const result = await store.dispatch(setStartDate(1000));
    expect(result.payload).toBe(1000);
    const state = store.getState();
    expect(state.filters.startDate).toBe(1000);
  })

  it('Should set filter end date', async () => {
    const store = createStore();
    const result = await store.dispatch(setEndDate(2000));
    expect(result.payload).toBe(2000);
    const state = store.getState();
    expect(state.filters.endDate).toBe(2000);
  })
})
