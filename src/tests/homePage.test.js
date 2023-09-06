import {
  selectWeatherData,
  selectWeatherStatus,
  selectWeatherError,
  selectWeatherForCity,
} from '../redux/homepageSlice';

describe('Selectors in homepageSlice', () => {
  const mockState = {
    weather: {
      weatherData: [
        { location: { country: 'Australia' } },
        { location: { country: 'Brazil' } },
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
    expect(selectedStatus).toBe(mockState.weather.status);
  });

  it('selectWeatherError should return the weather error', () => {
    const selectedError = selectWeatherError(mockState);
    expect(selectedError).toBe(mockState.weather.error);
  });

  it('selectWeatherForCity should return weather data for a specific city', () => {
    const countryName = 'Australia';
    const selectedCityData = selectWeatherForCity(mockState, countryName);
    expect(selectedCityData).toEqual(
      mockState.weather.weatherData.find(
        (city) => city.location.country === countryName,
      ),
    );
  });

  it('selectWeatherForCity should return undefined for a non-existent city', () => {
    const countryName = 'NonExistentCity';
    const selectedCityData = selectWeatherForCity(mockState, countryName);
    expect(selectedCityData).toBeUndefined();
  });
});
