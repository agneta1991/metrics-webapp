import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const endpoints = [
  'Paris',
  'New%20Delhi',
  'New%20York',
  'Sydney',
  'Tokyo',
  'Cairo',
  'Rio%20de%20Janeiro',
  'Cape%20Town',
];

const initialState = {
  weatherData: [],
  status: 'idle',
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async () => {
    const dataPromises = endpoints.map(async (endpoint) => {
      try {
        const response = await fetch(
          `http://api.weatherstack.com/current?access_key=4d314c94f11f9e48f4cb2ee884f63874&query=${endpoint}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to fetch weather data');
      }
    });

    const weatherData = await Promise.all(dataPromises);

    return weatherData;
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectWeatherData = (state) => state.weather.weatherData;
export const selectWeatherStatus = (state) => state.weather.status;
export const selectWeatherError = (state) => state.weather.error;

export default weatherSlice.reducer;
