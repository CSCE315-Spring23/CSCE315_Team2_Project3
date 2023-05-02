import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

export default function Home() {

  const managerEmails = ['carlos_casellas@tamu.edu'];
  const serverEmails = [];

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

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  const clientId = '594033697275-aea1ee17durj6nbv9je4gg462rmqehie.apps.googleusercontent.com';

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=college station&units=imperial&appid=bf2654fa7c7181f891ee8e383e28dd81';
  var response;
  axios.get(weatherURL).then((response) => {

    setData(response.data);
    // console.log(response.data);

  });

  var currentUser = "";

  const handleLoginSuccess = (res) => {
    currentUser = res.profileObj.email;
    console.log(managerEmails.includes(currentUser));
  };

  const handleLoginFailure = () => {
    currentUser = "";
  };

  const handleLogoutSuccess = () => {
    currentUser = "";
  }


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
            <LoginButton onSuccessCallback={handleLoginSuccess} onFailureCallback={handleLoginFailure}/>
            <LogoutButton onSuccessCallback={handleLogoutSuccess}/>
          </div>
      </div>
    </>
  )
}
