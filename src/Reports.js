import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Reports() {

  const navigate = useNavigate();

  const navigateToManager = () => {
    navigate('/Manager');
  };

  return (
    <>
      <div>
        This is the Reports Page
      </div>
      <button onClick={navigateToManager}>Exit</button>
    </>
  )
}
