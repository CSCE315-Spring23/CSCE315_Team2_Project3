import React from 'react';
import {useNavigate} from 'react-router-dom';
import Menu from './Menu';

export default function MenuBoard() {

    const navigate = useNavigate();

    const navigateHome = () => {
        // navigate to /contacts
        navigate('/');
    };

  return (
    <>
        <Menu></Menu>
        <button onClick={navigateHome}>Exit</button>
    </>
  )
}
