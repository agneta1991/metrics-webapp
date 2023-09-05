import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWeatherData,
  selectWeatherData,
  selectWeatherStatus,
  endpoints,
} from '../redux/homepageSlice';

function HomePage() {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData);
  const weatherStatus = useSelector(selectWeatherStatus);

  useEffect(() => {
    endpoints.forEach((endpoint) => {
      dispatch(fetchWeatherData(endpoint));
    });
  }, [dispatch]);

  const handleButtonClick = (data) => {
    console.log(
      `Button clicked for: ${data.location.country}, ${data.location.name}`,
    );
  };

  const renderButton = (data) => (
    <button
      type="button"
      key={data.location.country}
      onClick={() => handleButtonClick(data)}
    >
      {`${data.location.country}, ${data.location.name}`}
    </button>
  );

  let content;

  if (weatherStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (weatherData && weatherData.length > 0) {
    content = weatherData.map((data) => renderButton(data));
  } else {
    content = <p>No weather data available.</p>;
  }

  return (
    <div>
      <h1>Weather App</h1>
      <div>{content}</div>
    </div>
  );
}

export default HomePage;
