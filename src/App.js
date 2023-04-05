import React from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Employee from './Employee';
import Manager from './Manager';
import CreateOrder from './CreateOrder';
import Home from './Home';
import UpdatePrice from './UpdatePrice';
import Restock from './Restock';
import Reports from './Reports';


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
          <Route exact path = "/" element={<Home/>} />
          <Route path='/Employee' element={<Employee/>} />
          <Route path='/Manager' element={<Manager/>} />
          <Route path='/Employee/CreateOrder' element={<CreateOrder/>} />
          <Route path='/Manager/CreateOrder' element={<CreateOrder/>} />
          <Route path='/Manager/UpdatePrice' element={<UpdatePrice/>} />
          <Route path='/Manager/Restock' element={<Restock/>} />
          <Route path='/Manager/Reports' element={<Reports/>} />
      </Routes>
    
    </>
  );
}

export default App;
