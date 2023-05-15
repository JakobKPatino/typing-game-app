import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import currentPageReducer from './features/currentPage';
import currentAccountReducer from './features/currentAccount';
import currentDifficultyReducer from './features/currentDifficulty';

const store = configureStore({
  reducer: {
    currentPage: currentPageReducer,
    currentAccount: currentAccountReducer,
    currentDifficulty: currentDifficultyReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
