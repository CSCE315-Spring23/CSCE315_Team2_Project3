import React from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Employee from './Employee';
import Manager from './Manager';
import CreateOrder from './CreateOrder';


function App() {

  const navigate = useNavigate();

  const navigateToEmployee = () => {
    // navigate to /contacts
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
      </div>

      <Routes>
          <Route path='/Employee' element={<Employee/>} />
          <Route path='/Manager' element={<Manager/>} />
          <Route path='/Employee/CreateOrder' element={<CreateOrder/>} />
      </Routes>
    
    </>
  );
}

export default App;
