import moment from 'moment';
import numeral from "numeral";

export const formatAmount = (amount) => {
  return numeral(parseFloat(amount)/100).format('$0,0.00');
};

export const formatDate = (date) => {
  return moment(date).format('dddd, Do MMM YYYY');
};
