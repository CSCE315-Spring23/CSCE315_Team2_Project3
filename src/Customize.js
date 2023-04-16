import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import TabbedPane from './TabbedPane';
import Header from './Header';
//import arrays from another file
import { titles_ing, contents_ing, smoothieName } from './temp_helper.js';

export default function Customize() {
  const navigate = useNavigate();
  const [selectedAdd, setAdd] = useState('');
  const [selectedRemove, setRemove] = useState('');
  const [selectedTab, setSelectedTab] = useState('');

  const getChange = (newSelectedButton) => {
    //handle remove list
    if(selectedTab === "remove") {
      //prevent items in add-on list
      var newRem = newSelectedButton.filter( function( el ) {
        return selectedAdd.indexOf( el ) < 0;
      } );
      setRemove(newRem)
    }
    //handle add-on list
    else {
      //prevent items in remove list
      var newAdds = newSelectedButton.filter( function( el ) {
        return selectedRemove.indexOf( el ) < 0;
      } );
      setAdd(newAdds)
    }
  };

  const getTab = (newSelectedButton) => {
    setSelectedTab(newSelectedButton);
  };

  const updateOrder = () => {
    navigate('/CreateOrder');
  };

  return (
    //call TabbedPane in embedded html
    <>
      <Header pageTitle="Customize"/>

      <TabbedPane tabTitles={titles_ing} 
        tabContent={contents_ing} 
        multipleSelections={true} 
        onSelectedButtonChange={getChange}
        onSelectedTabChange={getTab}
        />

      <div className="selected-button">
        {selectedAdd.length > 0 && (
          <p>
            Selected Add Ons: {selectedAdd.join(", ")}
          </p>
        )}
      </div>
      <div className="selected-button">
        {selectedRemove.length > 0 && (
          <p>
            Selected Remove: {selectedRemove.join(", ")}
          </p>
        )}
      </div>
      <div className="selected-button">
          <p>
            Current Smoothie: {smoothieName}
          </p>
      </div>
      <button onClick={updateOrder} disabled={selectedRemove.length < 1 && selectedAdd.length < 1}>Update Order</button>
    </>
  )
}