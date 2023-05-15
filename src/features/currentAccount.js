import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  Login: {
    easy: {
      accuracyHighScore: 0,
      wpmHighScore: 0,
      pointsHighScore: 0
    },
    medium: {
      accuracyHighScore: 0,
      wpmHighScore: 0,
      pointsHighScore: 0
    },
    hard: {
      accuracyHighScore: 0,
      wpmHighScore: 0,
      pointsHighScore: 0
    }
  }
};

export const currentAccountSlice = createSlice({
  name: 'currentAccount',
  initialState: {
    value: initialStateValue
  },
  reducers: {
    changeAccount: (state, action) => {
      state.value = action.payload;
    },
    changeHighScore: (state, action) => {
      Object.values(state.value)[0][action.payload[0].toLowerCase()][action.payload[1]] = action.payload[2];
    }
  }
})

export const {changeAccount, changeHighScore} = currentAccountSlice.actions;

export default currentAccountSlice.reducer;