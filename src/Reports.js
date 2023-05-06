import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; 
import "./styles/reports.css";

export default function Reports() {

  const navigate = useNavigate();
  const [report, setReport] = useState('');

  const navigateToManager = () => {
    navigate('/Manager');
  };

  const excessReport = () => {
    const startDateValue = document.getElementById('excess-start-date').value;
    const endDateValue = document.getElementById('excess-end-date').value;
  
    // Extract year, month, and day from the input value using a regular expression
    const startDateParts = startDateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const endDateParts = endDateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  
    if (!startDateParts || !endDateParts) {
      console.error('Invalid date format');
      return;
    }
  
    // Construct date objects with the extracted year, month, and day values
    const startDate = new Date(startDateParts[1], startDateParts[2] - 1, startDateParts[3]);
    const endDate = new Date(endDateParts[1], endDateParts[2] - 1, endDateParts[3]);
  
    const start = startDate.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
    const end = endDate.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
  
    axios.get(`http://localhost:3000/excessReport/${start}/${end}`).then((response) => {
      setReport(response.data);
      console.log(response.data);
    });
  };

  const restockReport = () => {
    axios.get(`http://localhost:3000/restock-report`).then((response) => {
      setReport(response.data);
      console.log(response.data);
    });
  }
  

  const salesReport = () => {
    const startDateValue = document.getElementById('sales-start-date').value;
    const endDateValue = document.getElementById('sales-end-date').value;
    const smoothie = document.getElementById('sales-smoothie').value;
    console.log(smoothie)
  
    // Extract year, month, and day from the input value using a regular expression
    const startDateParts = startDateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const endDateParts = endDateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  
    if (!startDateParts || !endDateParts) {
      console.error('Invalid date format');
      return;
    }
  
    // Construct date objects with the extracted year, month, and day values
    const startDate = new Date(startDateParts[1], startDateParts[2] - 1, startDateParts[3]);
    const endDate = new Date(endDateParts[1], endDateParts[2] - 1, endDateParts[3]);
  
    const start = startDate.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
    const end = endDate.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
  
    axios.get(`http://localhost:3000/salesReport/${start}/${end}/${smoothie}`).then((response) => {
      setReport(response.data);
      console.log(response.data);
    });
  };

  return (
    <>
      <header id="reports-header">
        <h1>Reports</h1>
      </header>
      <div id='background'>
        <div id='report-options-wrapper'>
            <section id='restock-report'>
              <h1>Restock Report</h1>
              <div className='center-items'>
                {/* <input id='restock-amount' className="non-labeled-input" type="number" placeholder='Amount'></input> */}
                <button id='generate-restock-report-btn' onClick={restockReport}>Generate</button>
              </div>
            </section>

            <section id='sales-report'>
              <h1>Sales Report</h1>
              <div className='center-items'>
                <label for="sales-smoothie">Smoothie:</label>
                <input id='sales-smoothie' className="labeled-input" name='sales-smoothie' placeholder='Smoothie'></input>
                <br/>
                <label for="sales-start">Start:</label>
                <input id='sales-start-date' className="labeled-input" type="date" name='sales-start'></input>
                <label for="sales-end">End:</label>
                <input id='sales-end-date' className="labeled-input" type="date" name='sales-end'></input>
                <button id='generate-sales-report-btn' onClick={salesReport}>Generate</button>
              </div>
            </section>

            <section id='excess-report'>
              <h1>Excess Report</h1>
              <div className='center-items'>
                <label for="excess-start">Start:</label>
                <input id='excess-start-date' className="labeled-input" type="date" name='excess-start'></input>
                <label for="excess-end">End:</label>
                <input id='excess-end-date' className="labeled-input" type="date" name='excess-end'></input>
                <button id='generate-excess-report-btn' onClick={excessReport}>Generate</button>
              </div>
            </section>

            <section id='x-report'>
              <h1>X Report</h1>
              <div className='center-items'>
                <input id='x-report-id' className="non-labeled-input" type="number" placeholder='ID'></input>
                <button id='x-report-button'>Generate</button>
              </div>
            </section>

            <div className='center-items'>
              <button onClick={navigateToManager}>Exit</button>
            </div>
          </div>
          <div id='report-area'>
            <h2>Report</h2>
            <p id='report-text'>{report}</p>
          </div>
      </div>

    </>
  )
}
