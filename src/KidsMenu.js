import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function KidsMenu() {

  const [content_list, setContent] = useState([[]]);
  const [ingredients_list, setIngredients] = useState([[]]);
  const [price_list, setPrices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const smoothieResponse = await axios.get('http://localhost:3000/smoothies-in-blend/kids');
      const sml = smoothieResponse.data.smoothies;
      console.log(sml);
      await setContent(sml);

      const ings = [];
      const prcs = [];
      for ( let i=0; i<sml.length; i++) {
        const priceResponse = await axios.get(`http://localhost:3000/item-price/${sml[i]}`);
        const smoothieResponse = await axios.get(`http://localhost:3000/ingredients-in-smoothie/${sml[i]}`);
        const ing = smoothieResponse.data.ingredients;
        const price = priceResponse.data.price;
        console.log(ing);
        console.log(price);
        ings[i] = ing;
        prcs[i] = price;
      }
      await setIngredients(ings);
      await setPrices(prcs);
      console.log(ings);
    }
    fetchData();
    
  },[]);

  return (
    <>
      <div className="grid-container">
        {content_list.map((item, index) => (
          <div key={index} className="box">
            <div className="smoothie">{item}</div>
            <div className='price'>${price_list[index]}</div>
            <ul className="ingredients">
            {ingredients_list[index] && ingredients_list[index].map((ing, ingIndex) => (
                <li key={ingIndex}>{ing}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));
          gap: 20px;
        }
        .box {
          background-color: maroon;
          color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
          background: linear-gradient(90deg, #810000, #b30000);
        }
        .smoothie {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .price {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .ingredients {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .ingredients li {
          margin-bottom: 5px;
        }
      `}</style>
    </>
  );
}
