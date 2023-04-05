import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function Employee() {

  const navigate = useNavigate();

  const navigateToCreateOrder = () => {
    // navigate to /contacts
    navigate('/Employee/CreateOrder');
  };
  return (
    <>
        <div>
          <button onClick={navigateToCreateOrder}>Create Order</button>
        </div>
    </>
  )
}
