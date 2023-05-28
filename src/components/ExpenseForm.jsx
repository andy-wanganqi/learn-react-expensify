import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { formatAmount } from '../utils/amountConvert';

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
  const handleSaveExpense = async (e) => {
    e.preventDefault();
    if (!validateForm()){
      return;
    }
    await props.handleSaveExpense({
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
      <form className="field-group">
        <div className="field-group__item">
          <input 
            type="text" 
            name="description" 
            placeholder="Description" 
            autoFocus 
            className="text-input"
            value={expenseInForm.description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="field-group__item">
          <input 
            type="text" name="amount" 
            placeholder="Amount" 
            step="100" 
            className="text-input"
            value={expenseInForm.amountText}
            onChange={handleAmountChange}
          />
        </div>
        <div className="field-group__item">
          <DatePicker placeholderText="Created At"
            className="text-input"
            selected={moment(expenseInForm.createdAt).toDate()} 
            onChange={(date) => handleDateChange(date)} dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="field-group__item">
          <textarea 
            className="textarea"
            placeholder="Note (optional)"
            value={expenseInForm.note}
            onChange={handleNoteChange}
          ></textarea>
        </div>
        <div className="field-group__item ">
          <div className="button-group">
            <div className="button-group__item">
              <button 
                className="button"
                onClick={handleSaveExpense}
              >Save Expense</button>
            </div>
            {expenseInForm.id && (
              <div className="button-group__item">
                <button 
                  className="button"
                  onClick={handleRemoveExpense}
                >Remove Expense</button>
              </div>
            )}
          </div>
        </div>
      </form>
      <div>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ExpenseForm;
