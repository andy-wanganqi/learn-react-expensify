import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: '',
    accessToken: '',
  },
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    clearUser: (state, action) => {
      Object.assign(state, {
        uid: '',
        accessToken: '',
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
