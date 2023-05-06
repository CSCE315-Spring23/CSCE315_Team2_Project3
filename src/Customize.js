import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TabbedPane from './TabbedPane';
import Header from './Header';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Customize() {
  const { smoothieName } = useParams();
  const navigate = useNavigate();
  const [selectedAdd, setAdd] = useState(['none']);
  const [selectedRemove, setRemove] = useState(['none']);
  const [selectedTab, setSelectedTab] = useState('');
  const [orderID, setOrderID] = useState(0);
  const [titles_ing, setList] = useState([]);
  const [contents_ing, setContent] = useState([[]]);

  useEffect(() => {
    const fetchData = async () => {
      const orderResponse = await axios.get('http://localhost:3000/max-order-id');
      setOrderID(orderResponse.data);
      console.log(orderResponse.data);
  
      const typeResponse = await axios.get('http://localhost:3000/type-list');
      const typesList = ['remove'];
      typeResponse.data.types.forEach(element => {
        typesList.push(element);
      });;
      console.log(typesList);
      setList(typesList);

      const content = [];
      console.log(smoothieName);
      const removeResp = await axios.get('http://localhost:3000/ingredients-in-smoothie/'+smoothieName);
      const removes = removeResp.data;
      console.log(removes.ingredients);
      content[0] = removes.ingredients;

      for ( let i=1; i<typesList.length; i++) {
        const smoothieResponse = await axios.get(`http://localhost:3000/ings-in-type/${typesList[i]}`);
        const sml = smoothieResponse.data.ings;
        console.log(sml);
        content[i] = sml;
      }
      setContent(content);
    };
  
    fetchData();
  }, []);

  const getChange = (newSelectedButton) => {
    //handle remove list
    if(selectedTab === "remove") {
      //prevent items in add-on list
      var newRem = newSelectedButton.filter( function( el ) {
        return selectedAdd.indexOf( el ) < 0;
      } );
      setRemove(newRem)
    }
    //handle add-on list
    else {
      //prevent items in remove list
      var newAdds = newSelectedButton.filter( function( el ) {
        return selectedRemove.indexOf( el ) < 0;
      } );
      setAdd(newAdds)
    }
  };

  const getTab = (newSelectedButton) => {
    setSelectedTab(newSelectedButton);
  };

  const updateOrder = () => {
    axios.get('http://localhost:3000/handle-customizations/'+([selectedAdd])+'/'+([selectedRemove])+'/'+orderID+'/'+smoothieName);
    navigate('/CreateOrder');
  };

  return (
    //call TabbedPane in embedded html
    <>
      <Header pageTitle="Customize" orderID={orderID}/>

      <TabbedPane tabTitles={titles_ing} 
        tabContent={contents_ing} 
        multipleSelections={true} 
        onSelectedButtonChange={getChange}
        onSelectedTabChange={getTab}
        />

      <div className="selected-button">
        {selectedAdd.length > 0 && (
          <p>
            Selected Add Ons: {selectedAdd.join(", ")}
          </p>
        )}
      </div>
      <div className="selected-button">
        {selectedRemove.length > 0 && (
          <p>
            Selected Remove: {selectedRemove.join(", ")}
          </p>
        )}
      </div>
      <div className="selected-button">
          <p>
            Current Smoothie: {smoothieName}
          </p>
      </div>
      <button onClick={updateOrder} disabled={selectedRemove.length < 1 && selectedAdd.length < 1}>Update Order</button>
    </>
  )
}