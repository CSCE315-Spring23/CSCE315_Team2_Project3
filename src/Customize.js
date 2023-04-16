import React from 'react';
import { useState } from 'react';
import TabbedPane from './TabbedPane';
import Header from './Header';
//import arrays from another file
import { titles_ing, contents_ing } from './temp_helper.js';

export default function Customize() {
  const [selectedButton, setSelectedButton] = useState('');
  const getChange = (newSelectedButton) => {
    setSelectedButton(newSelectedButton);
  };
  return (
    //call TabbedPane in embedded html
    <>
      <Header pageTitle="Customize"/>

      <TabbedPane tabTitles={titles_ing} 
        tabContent={contents_ing} 
        multipleSelections={true} 
        onSelectedButtonChange={getChange}/>

      <div className="selected-button">
        {selectedButton.length > 0 && (
          <p>
            Selected button (parent): {selectedButton.join(", ")}
          </p>
        )}
      </div>
    </>
  )
}