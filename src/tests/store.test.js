import { configureStore } from '@reduxjs/toolkit';
import weatherSliceReducer from '../redux/homepageSlice';

describe('Redux Store Configuration', () => {
  it('should be configured correctly', () => {
    const mockInitialState = {
      weather: {
        weatherData: [],
        status: 'idle',
        error: null,
      },
    };

    const store = configureStore({
      reducer: {
        weather: weatherSliceReducer,
      },
      preloadedState: mockInitialState,
    });

    expect(store.getState()).toEqual(mockInitialState);
    expect(store.getState().weather).toBeDefined();
  });
});
