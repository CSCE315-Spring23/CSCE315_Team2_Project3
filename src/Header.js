import React from "react";
import "./styles/Header.css";
import { orderID, employee } from "./temp_helper";
var title = "title";

export default function Header(props) {
  title = props.pageTitle;
  orderID = props.orderID;

  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const navigateBack = () => {
    window.history.go(-1);
    return false;
  };

  return (
    <>
      <h1>{title}</h1>
      <h1>{date}</h1>
      <div className="basic-head">
        <img
          src={require("./styles/images/smoothie_king_logo.png")}
          alt={"logo"}
        ></img>
        <p>OrderID: {orderID}</p>
        <p>Name: {employee}</p>
        <button onClick={navigateBack}>{"back"}</button>
      </div>
    </>
  );
}
