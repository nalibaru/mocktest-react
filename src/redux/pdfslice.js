import { createSlice } from '@reduxjs/toolkit';

export const pdfSlice = createSlice({
  name: 'pdf',
  initialState: {
      pdfHeightInPoints: null,
      pdfDisplayHeight: null,
      pdfWidthInPoints: null,
      pdfDisplayWidth: null,
      offsetX: null,
      offsetY: null,
      dragLimitRight: null,
      dragLimitBottom : null
  },
  reducers: {
    setpdfHeightInPoints: (state, action) => {
      state.pdfHeightInPoints = action.payload;
      },
      setpdfDisplayHeight: (state, action) => {
        state.pdfDisplayHeight = action.payload;
      },
      setpdfWidthInPoints: (state, action) => {
        state.pdfWidthInPoints = action.payload;
      },
      setpdfDisplayWidth: (state, action) => {
        state.pdfDisplayWidth = action.payload;
      },
      setoffsetX: (state, action) => {
        state.offsetY = action.payload;
      },
      setoffsetY: (state, action) => {
        state.offsetY = action.payload;
      },
      setdragLimitRight: (state, action) => {
        state.dragLimitRight = action.payload;
      },
      setdragLimitBottom: (state, action) => {
      state.dragLimitBottom = action.payload;
      }
      
  }
});

// Action creators are generated for each case reducer function
export const {setpdfHeightInPoints, setpdfDisplayHeight,setpdfWidthInPoints,setpdfDisplayWidth,setoffsetX,setoffsetY,setdragLimitRight,setdragLimitBottom} = pdfSlice.actions;

export default pdfSlice.reducer;