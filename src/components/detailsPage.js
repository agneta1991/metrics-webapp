import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { selectWeatherForCity, fetchWeatherData } from '../redux/homepageSlice';
import './styles/pageStyle.css';
import australia from './images/australia.png';
import brazil from './images/brazil.png';
import egypt from './images/Egypt.png';
import france from './images/france.png';
import india from './images/india.png';
import japan from './images/japan.png';
import southAfrica from './images/southAfrica.png';
import usa from './images/usa.png';

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

const DetailsPage = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch]);

  const cityWeather = useSelector((state) => selectWeatherForCity(state, query));

  return (
    <div>
      <nav className="home-navbar">
        <Link to="/">
          <img
            className="arrow"
            src="https://img.icons8.com/windows/32/ffffff/back.png"
            alt="forward"
          />
        </Link>
        <p>CITY WEATHER</p>
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
      {cityWeather && <WeatherDetails cityWeather={cityWeather} />}
    </div>
  );
};

const WeatherDetails = ({ cityWeather }) => {
  const { location, current } = cityWeather;

  return (
    <div>
      <div className="header-div">
        <img src={countryImages[location.country]} alt={location.country} />
        <h2>
          {location.name}
          <br />
          {location.country}
          {' '}
          <br />
        </h2>
      </div>
      <h3>COUNTRY/CITY WEATHER BREAKDOWN</h3>
      <div>
        {Object.entries(current).map(([key, value], index) => (
          <div key={key} className={index % 2 === 0 ? 'one' : 'two'}>
            <WeatherDetailItem key={key} label={key} value={value} />
          </div>
        ))}
      </div>
    </div>
  );
};

const WeatherDetailItem = ({ label, value }) => (
  <>
    <p>
      {label}
      :
    </p>
    {label === 'weather_icons' ? (
      <img className="weather-icon" src={value} alt="weather_icon" />
    ) : (
      <p>{value}</p>
    )}
  </>
);

WeatherDetails.propTypes = {
  cityWeather: PropTypes.shape({
    location: PropTypes.shape({
      country: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    current: PropTypes.shape({
      observation_time: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      feelslike: PropTypes.number.isRequired,
      wind_speed: PropTypes.number.isRequired,
      wind_degree: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      cloudcover: PropTypes.number.isRequired,
      visibility: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

WeatherDetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]).isRequired,
};

export default DetailsPage;
