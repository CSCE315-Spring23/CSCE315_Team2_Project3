import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ backgroundColor: '#a93439',
     color: '#fff', 
     minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#d13239', 
      padding: '3rem' }}>
        <h1 style={{ margin: 1 }}>Manager Dashboard</h1>
      </header>
      <div style={{ padding: '1rem' }}>
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
