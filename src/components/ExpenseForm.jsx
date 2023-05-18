import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";

const ExpenseForm = (props) => {
  const { expense } = props;
  const initExpense = {
    id: expense ? expense.id : undefined,
    description: expense ? expense.description : '',
    amountText: expense ? (parseFloat(expense.amount) / 100).toString() : '',
    note: expense ? expense.note : '',
    createdAt: expense ? expense.createdAt : moment().startOf('day').valueOf(),
  };
  const [expenseInForm, setExpense] = useState(initExpense);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    setExpense(() => ({
      ...expenseInForm,
      description
    }));
  };
  const handleAmountChange = (e) => {
    const amountText = e.target.value;
    if (!amountText || amountText.match(/^\d{1,10}(\.\d{0,2})?$/)) {
      setExpense(() => ({
        ...expenseInForm,
        amountText
      }));
    }
  };
  const handleNoteChange = (e) => {
    const note = e.target.value;
    setExpense(() => ({
      ...expenseInForm,
      note
    }));
  };
  const handleDateChange = (date) => {
    if(date) {
      setExpense(() => ({
        ...expenseInForm,
        createdAt: moment(date).valueOf()
      }));
    }
  };
  const validateForm = () => {
    if (!expenseInForm.description || !expenseInForm.amountText) {
      setErrorMessage('Please provide description and amount.');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };
  const handleSaveExpense = (e) => {
    e.preventDefault();
    if (!validateForm()){
      return;
    }
    props.handleSaveExpense({
      description: expenseInForm.description,
      amount: parseFloat(expenseInForm.amountText) * 100,
      note: expenseInForm.note,
      createdAt: moment(expenseInForm.createdAt).valueOf(),
    });
  };
  const handleRemoveExpense = (e) => {
    e.preventDefault();
    props.handleRemoveExpense();
  };

  return (
    <div>
      <form>
        <input type="text" placeholder="Description" autoFocus 
          value={expenseInForm.description}
          onChange={handleDescriptionChange}
        />
        <input type="text" placeholder="Amount" step="100" 
          value={expenseInForm.amountText}
          onChange={handleAmountChange}
        />
        <textarea placeholder="Note (optional)"
          value={expenseInForm.note}
          onChange={handleNoteChange}
        ></textarea>
        <DatePicker showIcon selected={moment(expenseInForm.createdAt).toDate()} onChange={(date) => handleDateChange(date)} dateFormat="dd/MM/yyyy"/>
        <button onClick={handleSaveExpense}>Save Expense</button>
        {expenseInForm.id && <button onClick={handleRemoveExpense}>Remove Expense</button>}
      </form>
      <div>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ExpenseForm;
