import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate();

  const navigateToFeelEnergized = () => {
    // navigate to /contacts
    navigate('/MenuBoard/FeelEnergized');
  };
  const navigateToGetFit = () => {
    // 👇️ navigate to /Manager
    navigate('/MenuBoard/GetFit');
  };

  const navigateToBeWell = () => {
    // 👇️ navigate to /contacts
    navigate('/MenuBoard/BeWell');
  };

  const navigateToManageWeight = () => {

    navigate('/MenuBoard/ManageWeight');

  }

  const navigateToEnjoyTreat = () => {

    navigate('/MenuBoard/EnjoyTreat');

  }

  const navigateToKidsMenu = () => {

    navigate('/MenuBoard/KidsMenu');

  }

  return (
    <>
        <div className='manager-buttons'>
            <button onClick={navigateToFeelEnergized}>Feel Energized</button>
            <button onClick={navigateToGetFit}>Get Fit</button>
            <button onClick={navigateToBeWell}>Be Well</button>
            <button onClick={navigateToManageWeight}>Manage Weight</button>
            <button onClick={navigateToEnjoyTreat}>Enjoy Treat</button>
            <button onClick={navigateToKidsMenu}>Kids Menu</button>
        </div>
    </>
  )
}
