import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function CreateOrder() {

  const navigate = useNavigate();

  const navigateToCustomer = () => {
    navigate('/Customer');
  };


  return (
    <>
        <div>
            Create Order Page
        </div>
        <button onClick={navigateToCustomer}>Exit</button>
    </>
  )
}
