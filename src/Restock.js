import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Restock() {

  const navigate = useNavigate();

  const navigateToManager = () => {
    navigate('/Manager');
  };

  return (
    <>
      <div className="manager-container">
        <div className="logo"></div>
        <header className='manager-header'>
          <h1 className='manager-title'>Restock Dashboard</h1>
        </header>
        <div className='manager-buttons'>
          <button onClick={navigateToManager}>Exit</button>
        </div>
    </div>
    </>
  )
}
