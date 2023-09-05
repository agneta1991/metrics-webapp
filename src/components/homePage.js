import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  fetchWeatherData,
  selectWeatherData,
  selectWeatherStatus,
  selectWeatherError,
} from "../redux/homepageSlice";

function HomePage() {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData);
  const status = useSelector(selectWeatherStatus);
  const error = useSelector(selectWeatherError);

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch]);

  return (
    <div>
      <h1>Countries</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && (
        <p>
          Error:
          {error}
        </p>
      )}
      {status === "Succsess" && (
        <ul>
          {weatherData.map((data) => (
            <li key={data.location.name}>
              <Link to={`/city/${data.location.name}`}>
                {data.location.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
