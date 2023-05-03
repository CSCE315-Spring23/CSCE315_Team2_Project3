import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import QuantityCounter from './QuantityCounter';
//import arrays from another file
import { titles, contents, sizeTit, sizeCont } from './temp_helper.js';
import TabbedPane from './TabbedPane';
import './styles/OrderStyle.css';

export default function CreateOrder() {
  const navigate = useNavigate();
  const [smoothieSelect, setSmoothie] = useState('');
  const [sizeSelect, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedTab, setSelectedTab] = useState('');

  console.log(quantity);
  console.log(selectedTab);

  const navigateToCustomize = () => {
    navigate('/Customize');
  };
  const navigateToCheckout = () => {
    navigate('/Checkout');
  };
  
  const addToOrder = () => {
  };
  
  const getTab = (newSelectedButton) => {
    setSelectedTab(newSelectedButton);
  };
  const newSmoothie = (newSelectedButton) => {
    setSmoothie(newSelectedButton);
  };
  const newSize = (newSelectedButton) => {
    setSize(newSelectedButton);
  };
  const newQuantity = (newSelectedButton) => {
    setQuantity(newSelectedButton);
  };

  return (
    <>
      <Header pageTitle="Create Order"/>

      <TabbedPane tabTitles={titles} 
        tabContent={contents} 
        multipleSelections={false} 
        onSelectedButtonChange={newSmoothie}
        onSelectedTabChange={getTab}
        />

      <TabbedPane tabTitles={sizeTit} 
        tabContent={sizeCont} 
        multipleSelections={false} 
        onSelectedButtonChange={newSize}
        onSelectedTabChange={getTab}
        /> 

      <QuantityCounter onSelectedButtonChange={newQuantity}/>

      <div className="selected-button">
        {sizeSelect.length > 0 && (
          <p>
            Selected Size: {sizeSelect.join(", ")}
          </p>
        )}
      </div>
      
      <div className="selected-button">
        {smoothieSelect.length > 0 && (
          <p>
            Selected Smoothie: {smoothieSelect.join(", ")}
          </p>
        )}
      </div>

      <button className="bottom-buttons" onClick={navigateToCustomize} disabled={smoothieSelect.length < 1 || sizeSelect.length < 1}>Customize</button>
      <button className="bottom-buttons" onClick={addToOrder} disabled={smoothieSelect.length < 1 || sizeSelect.length < 1}>Add To Order</button>
      <button className="bottom-buttons" onClick={navigateToCheckout} disabled={smoothieSelect.length < 1 || sizeSelect.length < 1}>Checkout</button>
    </>
  )
}