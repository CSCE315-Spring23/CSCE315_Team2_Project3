import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();

  const navigateToEmployee = () => {
    navigate('/Employee');
  };

  const navigateToManager = () => {
    navigate('/Manager');
  };

  const navigateToCustomer = () => {
    navigate('/Customer');
  };

  const navigateToMenuBoard = () => {
    navigate('/MenuBoard');
  };

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=bf2654fa7c7181f891ee8e383e28dd81`;

  const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;
  const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=30.6181&lon=-96.34&units=imperial&appid=" + weatherAPIKey;
  // const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=30.6181&lon=-96.34&units=imperial&appid=bf2654fa7c7181f891ee8e383e28dd81";

  useEffect(() => {
    axios
      .get(weatherURL)
      .then((response) => {
        setWeatherLoaded(true);
        setWeatherInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="manager-container">
        <div className="logo"></div>
        <header className="manager-header">
          <h1 className="manager-title">Home Dashboard</h1>
        </header>
        <div className="manager-buttons">
          <button onClick={navigateToManager}>Manager</button>
          <button onClick={navigateToEmployee}>Employee</button>
          <button onClick={navigateToCustomer}>Customer</button>
          <button onClick={navigateToMenuBoard}>Menu</button>
          <div>
            {data.main ? (
              <>
                <h1>It is {Math.ceil(data.main.temp)} &#8457; in</h1>
                <p>
                  {data.name}, {data.sys.country}
                </p>
              </>
            ) : null}
          </div>

          <div>
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
}
