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
import './styles/pageStyle.css';

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
      <nav className="home-navbar">
        <img
          className="arrow"
          src="https://img.icons8.com/windows/32/ffffff/back.png"
          alt="forward"
        />

        <p>COUNTRIES</p>
        <img
          className="microphone"
          src="https://img.icons8.com/material/24/ffffff/microphone--v3.png"
          alt="microphone--v3"
        />
        <img
          className="settings"
          src="https://img.icons8.com/ios/50/ffffff/settings--v1.png"
          alt="settings--v1"
        />
      </nav>
      <header className="header-div">
        <img src={world} alt="world" />
        <h2 id="weather-app">Weather app</h2>
      </header>
      <h3>STATS BY COUNTRY</h3>
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
            if (index % 4 === 0) {
              className = 'first';
            } else if (index % 4 === 1) {
              className = 'second';
            } else if (index % 4 === 2) {
              className = 'third';
            } else {
              className = 'fourth';
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
