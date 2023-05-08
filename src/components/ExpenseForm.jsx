import React from "react"
import moment from 'moment'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class ExpenseForm extends React.Component {
  state = {
    description: '',
    amountText: '',
    note: '',
    createdAt: moment().startOf('day').toDate(),
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
          <DatePicker selected={this.state.createdAt} onChange={(date) => this.handleDateChange(date)} />
          <button>Save Expense</button>
        </form>
      </div>
    )
  }
  handleDescriptionChange = (e) => {
    const description = e.target.value
    this.setState(() => ({
      description
    }))
  }
  handleAmountChange = (e) => {
    const amountText = e.target.value
    if (amountText.match(/^\d+(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amountText
      }))
    }
  }
  handleNoteChange = (e) => {
    const note = e.target.value
    this.setState(() => ({
      note
    }))
  }
  handleDateChange = (date) => {
    this.setState(() => ({
      createdAt: date
    }))
  }
}

export default ExpenseForm
