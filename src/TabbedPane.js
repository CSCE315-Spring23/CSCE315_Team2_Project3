import React from 'react'
import { useState } from 'react';
import './styles/TabbedPane.css';

var titles = [];
var contents = [[]];

export default function TabbedPane(props) {
  //get passed in vars
  const multipleSelections = props.multipleSelections;
  titles = props.tabTitles;
  contents = props.tabContent;

  const [activeTab, setActiveTab] = useState(0);
  const [activeButtons, setActiveButtons] = useState(new Array(props.tabContent.length).fill(null).map(() => new Array(props.tabContent[0].length).fill(false)));
  const [selectedButtonText, setSelectedButtonText] = useState([]);
  props.onSelectedTabChange(titles[activeTab]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    props.onSelectedTabChange(titles[index]);
  };

  const getMatchingButtonIndex = (contents, buttonText) => {
    return contents.findIndex((item) => item === buttonText);
  };

  const handleButtonClick = (text, tabIndex, buttonIndex) => {
    const newActiveButtons = activeButtons.map((tabButtons, i) =>
      i === tabIndex ? tabButtons.map((_, j) => j === buttonIndex) : tabButtons
    );
    setActiveButtons(newActiveButtons);

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
                  onClick={() => handleButtonClick(item, index, itemIndex)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
    {/*
    <div className="selected-button">
        {selectedButtonText.length > 0 && (
          <p>
            Selected button: {selectedButtonText.join(", ")}
          </p>
        )}
    </div>
    */}
    </>
  )
}