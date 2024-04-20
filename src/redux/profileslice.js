import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null
  },
  reducers: {
    setImageData: (state, action) => {
      state.data = action.payload;
      }
  }
});

export const { setImageData } = profileSlice.actions;

export default profileSlice.reducer;