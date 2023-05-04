import React from 'react';
import {useNavigate} from 'react-router-dom';
import "./styles/reports.css";

export default function Reports() {

  const navigate = useNavigate();

  const navigateToManager = () => {
    navigate('/Manager');
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
                <input id='restock-amount' className="non-labeled-input" type="number" placeholder='Amount'></input>
                <button id='generate-restock-report-btn'>Generate</button>
              </div>
            </section>

            <section id='sales-report'>
              <h1>Sales Report</h1>
              <div className='center-items'>
                <label for="sales-start">Start:</label>
                <input id='sales-start-date' className="labeled-input" type="date" name='sales-start'></input>
                <label for="sales-end">End:</label>
                <input id='sales-end-date' className="labeled-input" type="date" name='sales-end'></input>
                <button id='generate-sales-report-btn'>Generate</button>
              </div>
            </section>

            <section id='excess-report'>
              <h1>Excess Report</h1>
              <div className='center-items'>
                <label for="excess-start">Start:</label>
                <input id='excess-start-date' className="labeled-input" type="date" name='excess-start'></input>
                <label for="excess-end">End:</label>
                <input id='excess-end-date' className="labeled-input" type="date" name='excess-end'></input>
                <button id='generate-excess-report-btn'>Generate</button>
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
            <p id='report-text'>The report will go here.</p>
          </div>
      </div>

    </>
  )
}
