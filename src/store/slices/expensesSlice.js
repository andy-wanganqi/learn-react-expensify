import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import db from '../../db';

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (payload) => {
    const { uid, expense } = payload;
    await db.createExpense(uid, expense);
    return expense;
  }
);

export const readExpenses = createAsyncThunk(
  'expenses/readExpenses',
  async (payload) => {
    const { uid } = payload;
    const expenses = await db.readExpenses(uid);
    return expenses;
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async (payload) => {
    const { uid, expense } = payload;
    await db.updateExpense(uid, expense);
    return expense;
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (payload) => {
    const { uid, expenseId } = payload
    await db.deleteExpense(uid, expenseId);
    return { expenseId };
  }
);

const _addExpense = (state, action) => {
  state.push(action.payload);
};

const _editExpense = (state, action) => {
  const index = state.findIndex(expense => expense.id === action.payload.id);
  if (index >= 0) {
    state[index] = action.payload;
  }
};

const _removeExpense = (state, action) => {
  const index = state.findIndex(expense => expense.id === action.payload.expenseId);
  if (index >= 0) {
    state.splice(index, 1);
  }
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    addExpense: _addExpense,
    editExpense: _editExpense,
    removeExpense: _removeExpense,
  },
  extraReducers: (builder) => {
    builder.addCase(createExpense.pending, (state, action) => {
    });
    builder.addCase(createExpense.fulfilled, (state, action) => {
      _addExpense(state, action);
    });
    builder.addCase(createExpense.rejected, (state, action) => {
    });
    builder.addCase(readExpenses.pending, (state, action) => {
    });
    builder.addCase(readExpenses.fulfilled, (state, action) => {
      state.splice(0, state.length, ...action.payload);
    });
    builder.addCase(readExpenses.rejected, (state, action) => {
    });
    builder.addCase(updateExpense.pending, (state, action) => {
    });
    builder.addCase(updateExpense.fulfilled, (state, action) => {
      _editExpense(state, action);
    });
    builder.addCase(updateExpense.rejected, (state, action) => {
    });
    builder.addCase(deleteExpense.pending, (state, action) => {
    });
    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      _removeExpense(state, action);
    });
    builder.addCase(deleteExpense.rejected, (state, action) => {
    });
  },
});

// Action creators are generated for each case reducer function
export const { addExpense, editExpense, removeExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
