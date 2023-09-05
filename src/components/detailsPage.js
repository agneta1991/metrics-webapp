import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectWeatherForCity } from '../redux/homepageSlice';

function DetailsPage() {
  const { query } = useParams();
  const cityWeather = useSelector((state) => selectWeatherForCity(state, query));
  const { location, current } = cityWeather;

  return (
    <div>
      {location && current && (
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
              {current.observation_time}
            </p>
            <p>
              Temperature:
              {current.temperature}
              °C
            </p>
            <p>
              Weather Description:
              {current.weather_descriptions[0]}
            </p>
            <p>
              Wind Speed:
              {current.wind_speed}
              {' '}
              km/h
            </p>
            <p>
              Wind Degree:
              {current.wind_degree}
              °
            </p>
            <p>
              Pressure:
              {current.pressure}
              {' '}
              mb
            </p>
            <p>
              Humidity:
              {current.humidity}
              %
            </p>
            <p>
              Cloud Cover:
              {current.cloudcover}
              %
            </p>
            <p>
              Visibility:
              {current.visibility}
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
