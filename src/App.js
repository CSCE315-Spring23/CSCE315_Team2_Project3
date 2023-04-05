import React from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Employee from './Employee';
import Manager from './Manager';


function App() {

  const navigate = useNavigate();

  const navigateToEmployee = () => {
    // 👇️ navigate to /contacts
    navigate('/Employee');
  };
  const navigateToManager = () => {
    // 👇️ navigate to /contacts
    navigate('/Manager');
  };

  return (
    <>

      <div>
        <button onClick={navigateToManager}>Manager</button>
        <button onClick={navigateToEmployee}>Employee</button>

        <Routes>
          <Route path='/Manager' element={<Manager/>} />
        </Routes>

        <Routes>
          <Route path='/Employee' element={<Employee/>} />
        </Routes>
        

      </div>
    
    </>
  );
}

export default App;
