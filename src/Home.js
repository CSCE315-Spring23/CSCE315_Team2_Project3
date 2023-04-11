import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate();

  const navigateToEmployee = () => {
    // navigate to /contacts
    navigate('/Employee');
  };
  const navigateToManager = () => {
    // 👇️ navigate to /contacts
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
      <div>
        <button onClick={navigateToManager}>Manager</button>
        <button onClick={navigateToEmployee}>Employee</button>
        <button onClick={navigateToCustomer}>Customer</button>
        <button onClick={navigateToMenuBoard}>Menu</button>
      </div>
    
    </>
  )
}
