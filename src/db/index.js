import * as firebase from '../firebase';

const createExpense = firebase.createExpense;
const readExpenses = firebase.readExpenses;
const updateExpense = firebase.updateExpense;
const deleteExpense = firebase.deleteExpense;

const wrap = {
  createExpense,
  readExpenses,
  updateExpense,
  deleteExpense,
};

export default wrap;
