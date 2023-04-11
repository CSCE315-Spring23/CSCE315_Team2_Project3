import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function UpdatePrice() {

  const navigate = useNavigate();

  const navigateToManager = () => {
    navigate('/Manager');
  };


  return (
    <>
      <div>
        This is the Update Price Page
      </div>
      <button onClick={navigateToManager}>Exit</button>
    </>
  )
}
