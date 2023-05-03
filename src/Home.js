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

  const searchLocation = () => {
    setButtonClicked(true);
    axios.get(weatherURL).then((response) => {
      setData(response.data);
      setLocation('');
    });
  };

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
          <div className="search-container">
            <input
              placeholder="Enter Location"
              value={location}
              type="text"
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  searchLocation();
                }
              }}
              onChange={(event) => setLocation(event.target.value)}
            />
            <button
              className={buttonClicked ? 'clicked' : ''}
              onClick={searchLocation}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
