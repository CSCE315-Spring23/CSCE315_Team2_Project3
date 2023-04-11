import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function MenuBoard() {

    const navigate = useNavigate();

    const navigateHome = () => {
        // navigate to /contacts
        navigate('/');
    };

  return (
    <>
        <div>Menu Board Here</div>
        <button onClick={navigateHome}>Exit</button>
    </>
  )
}
