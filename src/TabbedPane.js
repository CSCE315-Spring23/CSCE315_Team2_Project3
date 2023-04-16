import React from 'react'
import { useState } from 'react';
import './TabbedPane.css';

var titles = [];
var contents = [[]];
var multipleSelections = new Boolean(false);
const selectedButtonText = [];

export default function TabbedPane(props) {
  //get passed in vars
  multipleSelections = props.multipleSelections;
  titles = props.tabTitles;
  contents = props.tabContent;

  const [activeTab, setActiveTab] = useState(0);
  const [selectedButtonText, setSelectedButtonText] = useState([]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const getMatchingButtonIndex = (contents, buttonText) => {
    return contents.findIndex((item) => item === buttonText);
  };

  const handleButtonClick = (text) => {
    const buttonIndex = getMatchingButtonIndex(contents[activeTab], text);
    const buttonElements = document.querySelectorAll(".tab-panel.active button");
    buttonElements[buttonIndex].classList.remove("active");

    if (selectedButtonText.includes(text)) {
      // Deselect the button
      const newSelectedButtonText = selectedButtonText.filter((item) => item !== text);
      setSelectedButtonText(newSelectedButtonText);
      props.onSelectedButtonChange(newSelectedButtonText);
    } else {
      if(multipleSelections) {
        //append if multiple allowed
        setSelectedButtonText([...selectedButtonText, text]);
        props.onSelectedButtonChange([...selectedButtonText, text]); //update selection for export
      } else {
        setSelectedButtonText([text]);
        props.onSelectedButtonChange([text]); //update selection for export
      }
    }
  };

  return (
    <>
      <div className="tabbed-pane">
      <ul className="tab-nav">
        {titles.map((title, index) => (
          <li key={index}>
            <button
              className={index === activeTab ? "active" : ""}
              onClick={() => handleTabClick(index)}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {contents.map((content, index) => (
          <div
            key={index}
            className={`tab-panel ${activeTab === index ? 'active' : ''}`}
          >
            {content.map((item, itemIndex) => {
              return (
                <button
                  key={itemIndex}
                  className={selectedButtonText.includes(item) ? 'active' : ''}
                  onClick={() => handleButtonClick(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
    <div className="selected-button">
        {selectedButtonText.length > 0 && (
          <p>
            Selected button: {selectedButtonText.join(", ")}
          </p>
        )}
    </div>
    </>
  )
}