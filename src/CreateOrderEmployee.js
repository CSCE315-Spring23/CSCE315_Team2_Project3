import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function CreateOrder() {

  const navigate = useNavigate();

  const navigateToEmployee = () => {
    navigate('/Employee');
  };


  return (
    <>
        <div>
            Create Order Page
        </div>
        <button onClick={navigateToEmployee}>Exit</button>
    </>
  )
}
