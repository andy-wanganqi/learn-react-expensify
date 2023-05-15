import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ExpenseForm extends React.Component {
  state = {
    description: '',
    amountText: '',
    note: '',
    createdAt: new Date(),
    errorMessage: '',
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
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
          <DatePicker selected={this.state.createdAt} onChange={(date) => this.handleDateChange(date)} dateFormat="dd/MM/yyyy"/>
          <button>Save Expense</button>
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
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amountText) {
      this.setState(() => ({
        errorMessage: 'Please provide description and amount.'
      }));
    } else {
      this.setState(() => ({
        errorMessage: ''
      }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amountText) * 100,
        note: this.state.note,
        createdAt: moment(this.state.createdAt).valueOf(),
      });
    }
  }
}

export default ExpenseForm;
