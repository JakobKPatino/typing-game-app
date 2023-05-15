import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = 'home';

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState: {
    value: initialStateValue
  },
  reducers: {
    changePage: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const {changePage} = currentPageSlice.actions;

export default currentPageSlice.reducer;