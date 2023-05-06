import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; 

export default function Restock() {

  const navigate = useNavigate();
  const [report, setReport] = useState('');

  const navigateToManager = () => {
    navigate('/Manager');
  };

  const restock = () => {
    axios.get(`http://localhost:3000/restock-all`).then((response) => {
      setReport(response.data);
      console.log(response.data);
    });
  }

  return (
    <>
      <div className="manager-container">
        <div className="logo"></div>
        <header className='manager-header'>
          <h1 className='manager-title'>Restock Dashboard</h1>
        </header>

        <div className='center-items'>
          <input id='restock' className="non-labeled-input" placeholder='item'></input>
          <button id='restock-button' onClick={restock}>Restock Item</button>
        </div>

        <div id='report-area'>
            <p id='report-text'>{report}</p>
        </div>
        <div className='manager-buttons'>
          <button onClick={navigateToManager}>Exit</button>
        </div>
    </div>
    </>
  )
}
