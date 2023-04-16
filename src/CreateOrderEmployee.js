import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
//import arrays from another file
import { titles, contents } from './temp_helper.js';
import TabbedPane from './TabbedPane';

export default function CreateOrder() {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState('');
  
  const navigateToCustomize = () => {
    navigate('/Customize');
  };

  const getChange = (newSelectedButton) => {
    setSelectedButton(newSelectedButton);
  };

  return (
    //call TabbedPane in embedded html
    <>
      <Header pageTitle="Create Order"/>

      <TabbedPane tabTitles={titles} 
        tabContent={contents} 
        multipleSelections={false} 
        onSelectedButtonChange={getChange}/>

      <div className="selected-button">
        {selectedButton.length > 0 && (
          <p>
            Selected button (parent): {selectedButton.join(", ")}
          </p>
        )}
      </div>
      <button onClick={navigateToCustomize}>Customize</button>
    </>
  )
}