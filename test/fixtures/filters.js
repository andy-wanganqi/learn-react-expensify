import moment from "moment";

const filters = {
  text: 'Bill',
  sortBy: 'amount',
  startDate: moment(new Date()).startOf('month').valueOf(),
  endDate: moment(new Date()).endOf('month').valueOf(),
};

export default filters;
