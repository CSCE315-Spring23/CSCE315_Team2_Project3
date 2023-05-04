import React from 'react'
import {useNavigate} from 'react-router-dom';
import './styles/Background.css';

export default function Customer() {

  const navigate = useNavigate();

  const navigateToCreateOrder = () => {

    navigate('/CreateOrder');

  }

  const navigateHome = () => {
    // navigate to /contacts
    navigate('/');
  };

  return (
    <>
      <div className="manager-container">
      <header className='manager-header'>
        <h1 className='manager-title'>Customer Dashboard</h1>
      </header>
      <div className='manager-buttons'>
        <button onClick={navigateToCreateOrder}>Create Order</button>
        <button onClick={navigateHome}>Logout</button>
      </div>
    </div>
    </>
  )
}
