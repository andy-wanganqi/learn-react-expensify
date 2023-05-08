import React from 'react'

class ExpenseForm extends React.Component {
  state = {
    description: '',
    amountText: '',
    note: '',
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
}

export default ExpenseForm
