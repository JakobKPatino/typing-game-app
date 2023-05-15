import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = '';

export const currentDifficultySlice = createSlice({
  name: 'currentDifficulty',
  initialState: {
    value: initialStateValue
  },
  reducers: {
    changeDifficulty: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const {changeDifficulty} = currentDifficultySlice.actions;

export default currentDifficultySlice.reducer;