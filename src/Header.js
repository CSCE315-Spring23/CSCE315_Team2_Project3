import React from 'react'
import './Header.css';
var title = "title"

export default function Header(props) {
  title = props.pageTitle;
  const navigateBack = () => {
    window.history.go(-1);
    return false;
  };
  
  return (
    <>
      <div className='basic-head'>
      <img src={require('./images/smoothie_king_logo.png')} alt={"logo"}></img>
      <h1><span>{title}</span></h1>
      <button
        onClick={navigateBack}
        >{"back"}</button>
      </div>
    </>
  )
}