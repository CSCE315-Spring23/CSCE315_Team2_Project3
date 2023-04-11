import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Employee from './Employee';
import Manager from './Manager';
import CreateOrderEmployee from './CreateOrderEmployee';
import CreateOrderManager from './CreateOrderManager';
import Home from './Home';
import UpdatePrice from './UpdatePrice';
import Restock from './Restock';
import Reports from './Reports';
import Customer from './Customer';
import CreateOrderCustomer from './CreateOrderCustomer';
import MenuBoard from './MenuBoard';


function App() {

  return (
    <>

      <Routes>
          <Route exact path = "/" element={<Home/>} />
          <Route path='/Employee' element={<Employee/>} />
          <Route path='/Manager' element={<Manager/>} />
          <Route path='/Employee/CreateOrder' element={<CreateOrderEmployee/>} />
          <Route path='/Manager/CreateOrder' element={<CreateOrderManager/>} />
          <Route path='/Manager/UpdatePrice' element={<UpdatePrice/>} />
          <Route path='/Manager/Restock' element={<Restock/>} />
          <Route path='/Manager/Reports' element={<Reports/>} />
          <Route path='/Customer' element={<Customer/>} />
          <Route path='/Customer/CreateOrder' element={<CreateOrderCustomer/>} />
          <Route path='/MenuBoard' element={<MenuBoard/>} />
      </Routes>
    
    </>
  );
}

export default App;
