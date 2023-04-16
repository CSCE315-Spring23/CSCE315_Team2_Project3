import React from 'react';
import Header from './Header';

export default function Checkout() {

  const newOrder = () => {
  };
  const logout = () => {
  };

  return (
      <>
        <Header pageTitle="Create Order"/>
        <button
          onClick={newOrder}
          >{"New Order"}</button>
        <button
          onClick={logout}
          >{"Log Out"}</button>
      </>
  )
}