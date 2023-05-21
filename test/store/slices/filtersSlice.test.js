import moment from 'moment';
import reducer, { setFilterText, setSortBy, setStartDate, setEndDate } from '../../../src/store/slices/filtersSlice.js';

describe('Filters redux state tests', () => {
  beforeAll(() => {
  })
  
  it('Should initialize filters', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      text: '',
      sortBy: 'amount',
      startDate: moment().startOf('month').valueOf(),
      endDate: moment().endOf('month').valueOf(),
    });
  })

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
  })

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
  })

  it('Should set filter start date', async () => {
    const previousState = {
      text: '',
      sortBy: 'amount',
      startDate: moment().startOf('month').valueOf(),
      endDate: moment().endOf('month').valueOf(),
    };
    expect(reducer(previousState, setStartDate(1000))).toEqual({
      text: '',
      sortBy: 'amount',
      startDate: 1000,
      endDate: moment().endOf('month').valueOf(),
    });
  })

  it('Should set filter end date', async () => {
    const previousState = {
      text: '',
      sortBy: 'amount',
      startDate: moment().startOf('month').valueOf(),
      endDate: moment().endOf('month').valueOf(),
    };
    expect(reducer(previousState, setEndDate(2000))).toEqual({
      text: '',
      sortBy: 'amount',
      startDate: moment().startOf('month').valueOf(),
      endDate: 2000,
    });
  })
})
