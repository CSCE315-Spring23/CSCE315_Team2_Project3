import React, { useState } from 'react';

export default function QuantityCounter(props) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    props.onSelectedButtonChange(quantity+1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      props.onSelectedButtonChange(quantity-1);
    }
  };

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}