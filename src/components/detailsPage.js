import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  fetchWeatherData,
  selectWeatherData,
  selectWeatherStatus,
  selectWeatherError,
} from '../redux/homepageSlice';

function DetailsPage() {
  const { query } = useParams();
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData);
  const status = useSelector(selectWeatherStatus);
  const error = useSelector(selectWeatherError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWeatherData(query));
    }
  }, [dispatch, status, query]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  const location = weatherData?.location;
  const currentWeather = weatherData?.current;

  return (
    <div>
      {location && currentWeather && (
        <div>
          <h2>
            Weather in
            {' '}
            {location.name}
            ,
            {' '}
            {location.country}
            {' '}
            -
            {' '}
            {location.localtime}
          </h2>
          <div>
            <p>
              Current Observation Time:
              {currentWeather.observation_time}
            </p>
            <p>
              Temperature:
              {currentWeather.temperature}
              °C
            </p>
            <p>
              Weather Description:
              {currentWeather.weather_descriptions[0]}
            </p>
            <p>
              Wind Speed:
              {currentWeather.wind_speed}
              {' '}
              km/h
            </p>
            <p>
              Wind Degree:
              {currentWeather.wind_degree}
              °
            </p>
            <p>
              Pressure:
              {currentWeather.pressure}
              {' '}
              mb
            </p>
            <p>
              Humidity:
              {currentWeather.humidity}
              %
            </p>
            <p>
              Cloud Cover:
              {currentWeather.cloudcover}
              %
            </p>
            <p>
              Visibility:
              {currentWeather.visibility}
              {' '}
              km
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
