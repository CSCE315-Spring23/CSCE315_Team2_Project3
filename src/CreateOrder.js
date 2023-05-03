import React from 'react';
import {useNavigate} from 'react-router-dom';
import Header from './Header';
import QuantityCounter from './QuantityCounter';
//import arrays from another file
import { sizeTit, sizeCont } from './temp_helper.js';
import TabbedPane from './TabbedPane';
import './styles/OrderStyle.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateOrder() {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const [smoothieSelect, setSmoothie] = useState('');
  const [sizeSelect, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedTab, setSelectedTab] = useState('');
  const [orderID, setOrderID] = useState(0);
  const [title_list, setList] = useState([]);
  const [content_list, setContent] = useState([[]]);
  /*
  axios.get('http://localhost:3000/max-order-id').then((response) => {
      setOrderID(response.data);
      console.log(response.data);
    });
  */
  useEffect(() => {
    const fetchData = async () => {
      const orderResponse = await axios.get('http://localhost:3000/max-order-id');
      setOrderID(orderResponse.data);
      console.log(orderResponse.data);
  
      const blendResponse = await axios.get('http://localhost:3000/blend-list');
      const blendsList = blendResponse.data.blends;
      console.log(blendsList);
      setList(blendsList);
  
      const content = [];
      for ( let i=0; i<blendsList.length; i++) {
        const smoothieResponse = await axios.get(`http://localhost:3000/smoothies-in-blend/${blendsList[i]}`);
        const sml = smoothieResponse.data.smoothies;
        console.log(sml);
        content[i] = sml;
      }
      setContent(content);
    };
  
    fetchData();
  }, []);

  const navigateToCustomize = () => {
    navigate(`/Customize/${smoothieSelect}`, {state: {smoothieSelect}})
  };
  const navigateToCheckout = () => {
    navigate('/Checkout');
  };
  
  const addToOrder = async () => {
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const url = 'http://localhost:3000/handle-order/'+orderID+'/'+smoothieSelect+'/'+sizeSelect+'/'+date;
    axios.get(url);
    setAdded(true);
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
        tabContent={content_list} 
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

      <button className="bottom-buttons" onClick={navigateToCustomize} disabled={smoothieSelect.length < 1 || sizeSelect.length < 1 || added==false}>Customize</button>
      <button className="bottom-buttons" onClick={addToOrder} disabled={smoothieSelect.length < 1 || sizeSelect.length < 1}>Add To Order</button>
      <button className="bottom-buttons" onClick={navigateToCheckout} >Checkout</button>
    </>
  )
}