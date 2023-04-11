import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Restock() {

  const navigate = useNavigate();

  const navigateToManager = () => {
    navigate('/Manager');
  };

  return (
    <>
      <div>
        This is the Restock Page
      </div>
      <button onClick={navigateToManager}>Exit</button>
    </>
  )
}
