import React from 'react'
import {useNavigate} from 'react-router-dom';
import TabbedStuff from './CreateOrderEmployee';

export default function CreateOrder() {

  const navigate = useNavigate();

  const navigateToManager = () => {
    navigate('/Manager');
  };

  
  return (
    TabbedStuff,
    <>
        <div>
            Create Order Page
        </div>
        <button onClick={navigateToManager}>Exit</button>
    </>
  )
}
