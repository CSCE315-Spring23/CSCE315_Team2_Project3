import React from 'react';
import { useState } from 'react';
import Header from './Header';
import DetailsPane from './DetailsPane';
import {useNavigate} from 'react-router-dom';
import {total, orderItems} from './temp_helper';

export default function Checkout() {
  const entries = new Map(orderItems);
  const orderObs = Object.fromEntries(entries);
  const [values, setValues] = useState(orderObs);

  const handleSave = (key, newValue) => {
    setValues(prevValues => ({ ...prevValues, [key]: newValue }));
  }
  
  const handleDelete = (key) => {
    setValues(prevValues => {
      const updatedValues = { ...prevValues };
      delete updatedValues[key];
      return updatedValues;
    });
  }
  const navigate = useNavigate();

  const newOrder = () => {
    navigate('/CreateOrder');
  }

  const logout = () => {
    navigate('/');
  };

  return (
      <>
        <Header pageTitle="Create Order"/>
        <h2>Total: ${total}</h2>
        <button
          onClick={newOrder}
          >{"New Order"}</button>
        <div>
        {Object.entries(values).map(([key, value]) => (
          <DetailsPane
            key={key}
            defaultValue={value}
            onSave={(newValue) => handleSave(key, newValue)}
            onDelete={() => handleDelete(key)}
            index={key}
          />
        ))}
        </div>
        <button
          onClick={logout}
          >{"Log Out"}</button>
      </>
  )
}