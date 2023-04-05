import React from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Employee from './Employee';


function App() {

  const navigate = useNavigate();

  const navigateToEmployee = () => {
    // navigate to /contacts
    navigate('/Employee');
  };

  return (
    <>

      <div>
        <button>Manager</button>
        <button onClick={navigateToEmployee}>Employee</button>
      </div>

      <Routes>
          <Route path='/Employee' element={<Employee/>} />
      </Routes>
    
    </>
  );
}

export default App;
