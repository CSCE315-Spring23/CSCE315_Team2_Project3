import React from 'react'
import {useNavigate} from 'react-router-dom';
import './Background.css';

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

    navigate('/MenuBoard');

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
          </div>
    </div>
    </>
  )
}
