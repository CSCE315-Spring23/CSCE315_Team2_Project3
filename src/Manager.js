import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function Manager() {

  const navigate = useNavigate();

  const navigateToUpdatePrice = () => {
    navigate('/Manager/UpdatePrice');
  };

  const navigateToRestock = () => {
    navigate('/Manager/Restock');
  };

  const navigateToCreateOrder = () => {
    navigate('/Manager/CreateOrder');
  };

  const navigateToReports = () => {
    navigate('/Manager/Reports');
  };

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <>
        <div>
          <button onClick={navigateToUpdatePrice}>Update Price</button>
          <button onClick={navigateToRestock}>Restock Inventory</button>
          <button onClick={navigateToCreateOrder}>Create Order</button>
          <button onClick={navigateToReports}>Reports</button>
          <button onClick={navigateHome}>Logout</button>
        </div>
    </>
  )
}
