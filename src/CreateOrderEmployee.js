import React from 'react'
import {useNavigate} from 'react-router-dom';
import TabbedPane from './TabbedPane'
//import arrays from another file
import { titles, contents } from './temp_helper.js';

export default function CreateOrder() {
  const navigate = useNavigate();
  
  const navigateToEmployee = () => {
    navigate('/Employee');
  };
  
  return (
    //call TabbedPane in embedded html
    <>
      <img src={require('./images/smoothie_king_logo.png')}></img>
      <TabbedPane tabTitles={titles} tabContent={contents}/>
      <button onClick={navigateToEmployee}>Exit</button>
    </>
  )
}
