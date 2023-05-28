import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";

const initExpense = {
  id: '',
  description: '',
  amountText: '',
  note: '',
  createdAt: moment().startOf('day').valueOf(),
};

const ExpenseForm = (props) => {
  const { expense } = props;
  const [expenseInForm, setExpense] = useState(initExpense);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const parsedExpense = {
      id: expense ? expense.id : '',
      description: expense ? expense.description : '',
      amountText: expense ? (parseFloat(expense.amount) / 100).toString() : '',
      note: expense ? expense.note : '',
      createdAt: expense ? expense.createdAt : moment().startOf('day').valueOf(),
    };
    setExpense(parsedExpense);
  }, [expense]);

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
    <div className='page_content'>
      <div className='content-container'>
        <form className="form">
          <div className="form__row">
            <div className="form__field">
              <input 
                type="text" 
                name="description" 
                placeholder="Description" 
                autoFocus 
                className="text-input fill"
                value={expenseInForm.description}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__field">
              <input 
                type="text" name="amount" 
                placeholder="Amount" 
                step="100" 
                className="text-input fill"
                value={expenseInForm.amountText}
                onChange={handleAmountChange}
              />
            </div>
            <div className="form__field">
              <DatePicker placeholderText="Created At"
                className="text-input fill"
                selected={moment(expenseInForm.createdAt).toDate()} 
                onChange={(date) => handleDateChange(date)} dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="form__row">
            <div className="form__field">
              <textarea 
                className="textarea fill"
                placeholder="Note (optional)"
                value={expenseInForm.note}
                onChange={handleNoteChange}
              ></textarea>
            </div>
          </div>
          {errorMessage && <p className="form__error">{errorMessage}</p>}
          <div className="form__row">
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
                    className="button button-warning"
                    onClick={handleRemoveExpense}
                  >Remove Expense</button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
