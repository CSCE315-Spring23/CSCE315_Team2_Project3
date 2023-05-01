import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Background.css';

const Manager = () => {
  const navigate = useNavigate();

  const navigateToUpdatePrice = () => {
    navigate('/Manager/UpdatePrice');
  };

  const navigateToRestock = () => {
    navigate('/Manager/Restock');
  };

  const navigateToCreateOrder = () => {
    navigate('/CreateOrder');
  };

  const navigateToReports = () => {
    navigate('/Manager/Reports');
  };

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <div className="manager-container">
      <div className="logo"></div>
      <header className='manager-header'>
        <h1 className='manager-title'>Manager Dashboard</h1>
      </header>
      <div className='manager-buttons'>
        <button onClick={navigateToUpdatePrice}>Update Price</button>
        <button onClick={navigateToRestock}>Restock Inventory</button>
        <button onClick={navigateToCreateOrder}>Create Order</button>
        <button onClick={navigateToReports}>Reports</button>
        <button onClick={navigateHome}>Logout</button>
      </div>
    </div>
  );
};

export default Manager;

