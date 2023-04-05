import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function Employee() {

  const navigate = useNavigate();

  const navigateToCreateOrder = () => {
    navigate('/Employee/CreateOrder');
  };

  const navigateHome = () => {
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
