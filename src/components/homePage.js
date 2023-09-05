import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchWeatherData,
  selectWeatherData,
  selectWeatherStatus,
  selectWeatherError,
} from '../redux/homepageSlice';
import australia from './images/australia.png';
import brazil from './images/brazil.png';
import egypt from './images/Egypt.png';
import france from './images/france.png';
import india from './images/india.png';
import japan from './images/japan.png';
import southAfrica from './images/southAfrica.png';
import usa from './images/usa.png';
import world from './images/world.png';
import './styles/HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData);
  const status = useSelector(selectWeatherStatus);
  const error = useSelector(selectWeatherError);

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch]);

  const countryImages = {
    Australia: australia,
    Brazil: brazil,
    Egypt: egypt,
    France: france,
    India: india,
    Japan: japan,
    'South Africa': southAfrica,
    'United States of America': usa,
  };

  return (
    <div className="main-div">
      <header className="header-div">
        <img src={world} alt="world" />
        <h1>Weather app</h1>
      </header>
      <h3>Stats By Country</h3>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && (
        <p>
          Error:
          {error}
        </p>
      )}
      {status === 'Succsess' && (
        <ul>
          {weatherData.map((data, index) => {
            let className;
            if (index % 3 === 0) {
              className = 'first';
            } else if (index % 3 === 1) {
              className = 'second';
            } else {
              className = 'third';
            }

            return (
              <li key={data.location.country} className={className}>
                <Link to={`/city/${data.location.country}`}>
                  <div className="link-div">
                    {countryImages[data.location.country] && (
                      <img
                        src={countryImages[data.location.country]}
                        alt={data.location.country}
                      />
                    )}
                    <img
                      className="arrow"
                      src="https://img.icons8.com/ios/50/ffffff/circled-right-2.png"
                      alt="circled-left-2"
                    />
                    <p>{data.location.country}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
