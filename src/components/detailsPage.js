import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectWeatherForCity } from '../redux/homepageSlice';
import australia from './images/australia.png';
import brazil from './images/brazil.png';
import egypt from './images/Egypt.png';
import france from './images/france.png';
import india from './images/india.png';
import japan from './images/japan.png';
import southAfrica from './images/southAfrica.png';
import usa from './images/usa.png';
import './styles/pageStyle.css';

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

function DetailsPage() {
  const { query } = useParams();
  const cityWeather = useSelector((state) => selectWeatherForCity(state, query));
  const { location, current } = cityWeather;

  return (
    <div>
      {location && current && (
        <div>
          <div className="header-div">
            <img src={countryImages[location.country]} alt={location.country} />
            <h2>
              {' '}
              {location.name}
              <br />
              {location.country}
              {' '}
              <br />
            </h2>
          </div>
          <h3>COUNTRY/CITY WEATHER BREAKDOWN</h3>
          <div>
            <div className="one">
              <p>Current observation time:</p>
              <p>{current.observation_time}</p>
              <img
                className="arrow-two"
                src="https://img.icons8.com/ios/50/ffffff/circled-right-2.png"
                alt="circled-left-2"
              />
            </div>
            <div className="two">
              <p>Temperature:</p>
              <p>
                {current.temperature}
                °C
              </p>
              <img
                className="arrow-two"
                src="https://img.icons8.com/ios/50/ffffff/circled-right-2.png"
                alt="circled-left-2"
              />
            </div>
            <div className="one">
              <p>Feels like:</p>
              <p>
                {current.feelslike}
                {' '}
                °C
              </p>
              <img
                className="arrow-two"
                src="https://img.icons8.com/ios/50/ffffff/circled-right-2.png"
                alt="circled-left-2"
              />
            </div>
            <div className="two">
              <p>Wind speed:</p>
              <p>
                {current.wind_speed}
                {' '}
                km/h
              </p>
              <img
                className="arrow-two"
                src="https://img.icons8.com/ios/50/ffffff/circled-right-2.png"
                alt="circled-left-2"
              />
            </div>
            <div className="one">
              <p>Wind degree:</p>
              <p>
                {current.wind_degree}
                °
              </p>
              <img
                className="arrow-two"
                src="https://img.icons8.com/ios/50/ffffff/circled-right-2.png"
                alt="circled-left-2"
              />
            </div>
            <div className="two">
              <p>Preassure:</p>
              <p>
                {current.pressure}
                {' '}
                mb
              </p>
              <img
                className="arrow-two"
                src="https://img.icons8.com/ios/50/ffffff/circled-right-2.png"
                alt="circled-left-2"
              />
            </div>
            <div className="one">
              <p>Humidity:</p>
              <p>
                {current.humidity}
                %
              </p>
              <img
                className="arrow-two"
                src="https://img.icons8.com/ios/50/ffffff/circled-right-2.png"
                alt="circled-left-2"
              />
            </div>
            <div className="two">
              <p>Cloud cover:</p>
              <p>
                {current.cloudcover}
                %
              </p>
              <img
                className="arrow-two"
                src="https://img.icons8.com/ios/50/ffffff/circled-right-2.png"
                alt="circled-left-2"
              />
            </div>
            <div className="one">
              <p>Visibility:</p>
              <p>
                {current.visibility}
                {' '}
                km
              </p>
              <img
                className="arrow-two"
                src="https://img.icons8.com/ios/50/ffffff/circled-right-2.png"
                alt="circled-left-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
