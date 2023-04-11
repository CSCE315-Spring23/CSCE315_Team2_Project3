import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function CreateOrder() {

  const navigate = useNavigate();

  const navigateToManager = () => {
    navigate('/Manager');
  };


  return (
    <>
        <div>
            Create Order Page
        </div>
        <button onClick={navigateToManager}>Exit</button>
    </>
  )
}
