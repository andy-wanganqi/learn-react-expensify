import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: '',
    accessToken: '',
    email: '',
    displayName: '',
    photoUrl: '',
    __authentication: undefined, 
  },
  reducers: {
    setUser: (state, action) => {
      const { uid, accessToken, email, displayName, photoUrl } = action.payload;
      state.uid = uid;
      state.accessToken = accessToken;
      state.email = email;
      state.displayName = displayName;
      state.photoUrl = photoUrl;
      state.__authentication = true;
    },
    clearUser: (state, action) => {
      state.uid = '';
      state.accessToken = '';
      state.email = '';
      state.displayName = '';
      state.photoUrl = '';
      state.__authentication = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
