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
    try {
      const promises = endpoints.map(async (endpoint) => {
        const response = await fetch(
          `http://api.weatherstack.com/current?access_key=a2c151427ae4b1988d05df99551b944a&query=${endpoint}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      });
      return Promise.all(promises);
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
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
        state.status = 'Succsess';
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
export const selectWeatherForCity = (state, countryName) => state.weather.weatherData.find(
  (city) => city.location.country === countryName,
);
export default weatherSlice.reducer;
