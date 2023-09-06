import { selectWeatherData, selectWeatherStatus } from '../redux/homepageSlice';

describe('weatherSlice selectors', () => {
  const mockState = {
    weather: {
      weatherData: [
        { location: { country: 'France' } },
        { location: { country: 'India' } },
      ],
      status: 'Succsess',
      error: null,
    },
  };

  it('selectWeatherData should return the weather data', () => {
    const selectedData = selectWeatherData(mockState);
    expect(selectedData).toEqual(mockState.weather.weatherData);
  });

  it('selectWeatherStatus should return the weather status', () => {
    const selectedStatus = selectWeatherStatus(mockState);
    expect(selectedStatus).toBe('Succsess');
  });
});
