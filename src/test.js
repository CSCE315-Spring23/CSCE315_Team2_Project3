import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Test() {
  const [stuff, setData] = useState(null);

  //in this example url, smoothies-in-blend is the function called, manage_weight is the param
  const url = 'http://localhost:3000/max_order_id';

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <h1>
      Received: {typeof stuff === 'object' ? JSON.stringify(stuff) : `${stuff}`}
    </h1>
  );
}
