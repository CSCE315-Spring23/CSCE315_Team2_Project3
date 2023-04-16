import React from 'react'
import {useNavigate} from 'react-router-dom';

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
      <div>
        <button onClick={navigateToCreateOrder}>Create Order</button>
        <button onClick={navigateHome}>Logout</button>
      </div>
    </>
  )
}
