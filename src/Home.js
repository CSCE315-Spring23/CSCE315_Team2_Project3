import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const managerEmails = ["carlos_casellas@tamu.edu"];
  const serverEmails = [];

  const navigate = useNavigate();

  const navigateToEmployee = () => {
    // navigate to /contacts
    navigate("/Employee");
  };
  const navigateToManager = () => {
    // 👇️ navigate to /Manager
    navigate("/Manager");
  };

  const navigateToCustomer = () => {
    // 👇️ navigate to /contacts
    navigate("/Customer");
  };

  const navigateToMenuBoard = () => {
    navigate("/MenuBoard/FeelEnergized");
  };

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [weatherLoaded, setWeatherLoaded] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({});

  const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;
  const weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?lat=30.6181&lon=-96.34&units=imperial&appid=" +
  weatherAPIKey;


  useEffect(() => {
    axios
      .get(weatherURL)
      .then((response) => {
        setWeatherLoaded(true);
        setWeatherInfo(response.data);
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
          {weatherLoaded && (
            <div className="weather">
              <p>Current Temperature: {weatherInfo.main.temp} ºF</p>
              <p>Current Weather: {weatherInfo.weather[0].description}</p>
              <p>High Today: {weatherInfo.main.temp_max} ºF</p>
            </div>
          )}
        </header>
        <div className="manager-buttons">
          <button onClick={navigateToManager}>Manager</button>
          <button onClick={navigateToEmployee}>Employee</button>
          <button onClick={navigateToCustomer}>Customer</button>
          <button onClick={navigateToMenuBoard}>Menu</button>
          {/* /*  <div>{data.main ? <h1>{Math.ceil(data.main.temp)}</h1> : null}</div> */}
        </div>
      </div>
    </>
  );
}
