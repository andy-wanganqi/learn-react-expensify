import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as db from '../../db';

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (expense) => {
    await db.createExpenseAsync(expense);
    return expense;
  }
);

const _addExpense = (state, action) => {
  state.push(action.payload);
};
export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    addExpense: _addExpense,
    editExpense: (state, action) => {
      const index = state.findIndex(expense => expense.id === action.payload.id);
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    removeExpense: (state, action) => {
      const index = state.findIndex(expense => expense.id === action.payload.id);
      if (index >= 0) {
        state.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createExpense.pending, (state, action) => {
    });
    builder.addCase(createExpense.fulfilled, (state, action) => {
      _addExpense(state, action);
    });
    builder.addCase(createExpense.rejected, (state, action) => {
    });
  },
});

// Action creators are generated for each case reducer function
export const { addExpense, editExpense, removeExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
