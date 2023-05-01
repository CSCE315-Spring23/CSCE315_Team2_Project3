import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
// import {Translate} from '@google-cloud/translate';
require('dotenv').config();

export default function Home() {

  const navigate = useNavigate();

  const navigateToEmployee = () => {
    // navigate to /contacts
    navigate('/Employee');
  };
  const navigateToManager = () => {
    // 👇️ navigate to /Manager
    navigate('/Manager');
  };

  const navigateToCustomer = () => {
    // 👇️ navigate to /contacts
    navigate('/Customer');
  };

  const navigateToMenuBoard = () => {

    navigate('/MenuBoard/FeelEnergized');

  }

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial&appid=bf2654fa7c7181f891ee8e383e28dd81';
  var response;
  axios.get(weatherURL).then((response) => {

    setData(response.data);
    console.log(response.data);

  });

  return (
    <>
      <div className="manager-container">
        <div className="logo"></div>
        <header className='manager-header'>
          <h1 className='manager-title'>Home Dashboard</h1>
        </header>
          <div className='manager-buttons'>
            <button onClick={navigateToManager}>Manager</button>
            <button onClick={navigateToEmployee}>Employee</button>
            <button onClick={navigateToCustomer}>Customer</button>
            <button onClick={navigateToMenuBoard}>Menu</button>
            <div>{data.main ? <h1>{Math.ceil(data.main.temp)}</h1> : null}</div>
          </div>
      </div>
    </>
  )
}
