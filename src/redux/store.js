// store.js
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './homepageSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
