import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState , useEffect } from 'react';
import Header from './Header';
import QuantityCounter from './QuantityCounter';
//import arrays from another file
import { contents, sizeTit, sizeCont } from './temp_helper.js';
import TabbedPane from './TabbedPane';
import './styles/OrderStyle.css';
import axios from 'axios';

export default function CreateOrder() {
  const navigate = useNavigate();
  const [smoothieSelect, setSmoothie] = useState('');
  const [sizeSelect, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedTab, setSelectedTab] = useState('');
  const [orderID, setOrderID] = useState(0);
  const [title_list, setList] = useState([]);
  const [content_list, setContent] = useState([[]]);

  console.log(content_list);

  useEffect(() => {
    axios.get('http://localhost:3000/max-order-id').then((response) => {
      setOrderID(response.data);
      console.log(response.data);
    });

    axios.get('http://localhost:3000/blend-list').then((response) => {
      const blendsList = response.data.blends;
      console.log(blendsList);
      setList(response.data.blends);
    });
    
    const content = [[]]
    const blend = "enjoy_a_treat";
    console.log(blend);
    axios.get('http://localhost:3000/smoothies-in-blend/enjoy_a_treat/').then((response) => {
      const sml = response.data.smoothies;
      console.log(sml);
      content.push(sml);
    });

    setContent(content);

  }, [ ])

  console.log(quantity);
  console.log(selectedTab);

  const navigateToCustomize = () => {
    navigate('/Customize');
  };
  const navigateToCheckout = () => {
    navigate('/Checkout');
  };
  
  const addToOrder = async () => {    
    fetch('http://localhost:3000/max-order-id')
      .then(response => response.json())
      .then(data => {
        // Do something with the data, like display it on the page
        console.log(data);
        setOrderID(data);
      })
      .catch(error => console.error(error));
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
      <Header pageTitle="Create Order"
        orderID={orderID}
      />

      <TabbedPane tabTitles={title_list} 
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