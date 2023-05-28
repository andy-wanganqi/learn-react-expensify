import * as firebase from '../firebase';

const createExpense = firebase.createExpense;
const readExpenses = firebase.readExpenses;
const readExpense = firebase.readExpense;
const updateExpense = firebase.updateExpense;
const deleteExpense = firebase.deleteExpense;

const wrap = {
  createExpense,
  readExpenses,
  readExpense,
  updateExpense,
  deleteExpense,
};

export default wrap;
