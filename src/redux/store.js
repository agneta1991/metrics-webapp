import { configureStore } from '@reduxjs/toolkit';
import weatherSliceReducer from './homepageSlice';

const store = configureStore({
  reducer: {
    weather: weatherSliceReducer,
  },
});

export default store;
