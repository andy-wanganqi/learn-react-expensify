import moment from 'moment';
import reducer, { setFilterText, setDateRange, setSortBy } from '../../../src/store/slices/filtersSlice.js';

describe('Filters redux state tests', () => {
  it('Should initialize filters', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      text: '',
      sortBy: 'amount',
      startDate: null,
      endDate: null,
    });
  });

  it('Should set filter text', async () => {
    const previousState = {
      text: '',
      sortBy: 'amount',
      startDate: moment().startOf('month').valueOf(),
      endDate: moment().endOf('month').valueOf(),
    };
    expect(reducer(previousState, setFilterText('keyword'))).toEqual({
      text: 'keyword',
      sortBy: 'amount',
      startDate: moment().startOf('month').valueOf(),
      endDate: moment().endOf('month').valueOf(),
    });
  });

  it('Should set filter without start date and end date', async () => {
    const previousState = {
      text: '',
      sortBy: 'amount',
      startDate: moment().startOf('month').valueOf(),
      endDate: moment().endOf('month').valueOf(),
    };
    const action = setDateRange({ 
      startDate: null,
      endDate: null,
    });
    expect(reducer(previousState, action)).toEqual({
      text: '',
      sortBy: 'amount',
      startDate: null,
      endDate: null,
    });
  });

  
  it('Should set filter with start date and end date', async () => {
    const startDate = moment().startOf('month').valueOf();
    const endDate = moment().endOf('month').valueOf();
    const previousState = {
      text: '',
      sortBy: 'amount',
      startDate: null,
      endDate: null,
    };
    const action = setDateRange({ 
      startDate,
      endDate,
    });
    expect(reducer(previousState, action)).toEqual({
      text: '',
      sortBy: 'amount',
      startDate,
      endDate,
    });
  });

  it('Should set filter sort by', async () => {
    const previousState = {
      text: '',
      sortBy: 'amount',
      startDate: moment().startOf('month').valueOf(),
      endDate: moment().endOf('month').valueOf(),
    };
    expect(reducer(previousState, setSortBy('createdAt'))).toEqual({
      text: '',
      sortBy: 'createdAt',
      startDate: moment().startOf('month').valueOf(),
      endDate: moment().endOf('month').valueOf(),
    });
  });
});
