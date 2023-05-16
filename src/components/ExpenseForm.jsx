import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";

class ExpenseForm extends React.Component {
  constructor(props){
    super(props);
    let expense = props.expense;
    this.state = {
      id: expense ? expense.id : '',
      description: expense ? expense.description : '',
      amountText: expense ? (parseFloat(expense.amount) / 100).toString() : '',
      note: expense ? expense.note : '',
      createdAt: expense ? moment(expense.createdAt).valueOf() : new Date(),
      errorMessage: '',
    };
  }
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Description" autoFocus 
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          <input type="text" placeholder="Amount" step="100" 
            value={this.state.amountText}
            onChange={this.handleAmountChange}
          />
          <textarea placeholder="Note (optional)"
            value={this.state.note}
            onChange={this.handleNoteChange}
          ></textarea>
          <DatePicker showIcon selected={this.state.createdAt} onChange={(date) => this.handleDateChange(date)} dateFormat="dd/MM/yyyy"/>
          <button onClick={this.handleSaveExpense}>Save Expense</button>
          {this.state.id && <button onClick={this.handleRemoveExpense}>Remove Expense</button>}
        </form>
        <div>
          {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
        </div>
      </div>
    );
  }
  handleDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({
      description
    }));
  }
  handleAmountChange = (e) => {
    const amountText = e.target.value;
    if (!amountText || amountText.match(/^\d{1,10}(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amountText
      }));
    }
  }
  handleNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({
      note
    }));
  }
  handleDateChange = (date) => {
    if(date) {
      this.setState(() => ({
        createdAt: date
      }));
    }
  }
  validateForm = () => {
    if (!this.state.description || !this.state.amountText) {
      this.setState(() => ({
        errorMessage: 'Please provide description and amount.'
      }));
      return false;
    } else {
      this.setState(() => ({
        errorMessage: ''
      }));
      return true;
    }
  }
  handleSaveExpense = (e) => {
    e.preventDefault();
    if (!this.validateForm()){
      return;
    }
    this.props.handleSaveExpense({
      description: this.state.description,
      amount: parseFloat(this.state.amountText) * 100,
      note: this.state.note,
      createdAt: moment(this.state.createdAt).valueOf(),
    });
  }
  handleRemoveExpense = (e) => {
    e.preventDefault();
    this.props.handleRemoveExpense();
  }
}

export default ExpenseForm;
