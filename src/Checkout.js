import React from 'react';
import Header from './Header';
import DetailsPane from './DetailsPane';
import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const navigate = useNavigate();
  const [orderID, setOrderID] = useState(0);
  const [complete, setComplete] = useState(false);
  const [values, setValues] = useState(0);
  //const [arr, setArr] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let id=0;
    const getOrder = async () => {
      await axios.get('http://localhost:3000/max-order-id').then((response) => {
        setOrderID(response.data);
        id = response.data;
        console.log(orderID)
      });
      console.log('order:', id);
      await axios.get('http://localhost:3000/order/'+id).then((response) => {
        console.log(response.data.ret)
        const entries = new Map(response.data.ret);
        const orderObs = Object.fromEntries(entries);
        setValues(orderObs);
        //setArr(response.data.ret);
        getTotal(id);
      })
    }
    getOrder();
  }, []);

  const handleSave = (key, newValue) => {
    setValues(prevValues => ({ ...prevValues, [key]: newValue }));
  }

  function deleter(smoothie, add, remv, size) {
    axios.get('http://localhost:3000/remove-item/'+orderID+'/'+smoothie+'/'+add+'/'+remv+'/'+size)
    .then(() => {
      getTotal(orderID);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  const handleDelete = (key) => {
    setValues(prevValues => {
      const updatedValues = { ...prevValues };
      const forDel = updatedValues[key];
      console.log('del: ',forDel);
      const smoothie = forDel[0];
      const size = forDel[1]
      const add = forDel[2]
      const remv = forDel[3]
      deleter(smoothie, add, remv, size)
      delete updatedValues[key];
      return updatedValues;
    });
    getTotal(orderID);
  }

  const fetchData = async () => {
      await axios.get('http://localhost:3000/max-order-id')
      .then((orderResponse) => {
        const id = orderResponse.data+1;

        console.log(orderResponse.data+1);
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        const url = 'http://localhost:3000/handle-order/'+id+'/none/none/'+date;
        axios.get(url);
      })
  }

  const newOrder = () => {
    navigate('/CreateOrder');
  };

  const completeOrder = () => {
    fetchData();
    setComplete(true);
  };

  const getTotal = (id) => {
    console.log("id",id);
    axios.get('http://localhost:3000/order-total/'+id).then((p)=>{
      setPrice(p.data.total);
      console.log(p.data.total);
    })
  };

  return (
      <>
        <Header pageTitle="Checkout" orderID={orderID}/>
        <div style={{ display: "flex", alignItems: "center", paddingLeft: "5%" }}>
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
          <p style={{ marginLeft: "5%", fontWeight: "bold", fontSize: "1.2rem" }}>Total: ${price}</p>
        </div>
        <p>
          
        </p>
        <button
          onClick={newOrder} disabled={complete===false}
          >{"New Order"}</button>
        {/* <button
          onClick={logout}
          >{"Log Out"}</button> */}
        <button
          onClick={completeOrder}
          >{"Complete Order"}</button>
      </>
  )
}