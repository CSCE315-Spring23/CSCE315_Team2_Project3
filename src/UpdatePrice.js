import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function UpdatePrice() {

  const navigate = useNavigate();

  const navigateToManager = () => {
    navigate('/Manager');
  };


  return (
    <>
      <div className="manager-container">
        <header className='manager-header'>
          <h1 className='manager-title'>Update Price Dashboard</h1>
        </header>
        <div className='manager-buttons'>
          <button onClick={navigateToManager}>Exit</button>
        </div>
    </div>
    </>
  )
}
