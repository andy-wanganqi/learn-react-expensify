import { v4 as uuid } from 'uuid';

export const addExpense = ({
  description = '', 
  note = '', 
  amount = 0, 
  createdAt = 0 
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  }
})
export const editExpense = ({
  id,
  description = '', 
  note = '', 
  amount = 0, 
  createdAt = 0 
} = {}) => ({
  type: 'EDIT_EXPENSE',
  expense: {
    id,
    description,
    note,
    amount,
    createdAt,
  }
})
export const removeExpense = ({
  id,
} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
})