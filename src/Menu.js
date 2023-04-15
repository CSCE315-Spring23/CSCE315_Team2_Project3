import React from 'react';
import MenuNavbar from './MenuNavbar';
// import GetFit from './GetFit';
// import BeWell from './BeWell';
// import KidsMenu from './KidsMenu';
// import EnjoyTreat from './EnjoyTreat';
import FeelEnergized from './FeelEnergized';
// import ManageWeight from './ManageWeight';

export default function Menu() {

    let component;

    switch(window.location.pathname) {

        case "/MenuBoard/FeelEnergized":
            component = <FeelEnergized/>
            break

        default:
            component = <FeelEnergized/>
            break
    }


  return (
    <>
        <h1>Menu</h1>
        
        <div id="menu-wrapper">

            <button onClick={displayFeelEnergized}>FeelEnergized</button>
            <button onClick={displayGetFit}>Get Fit</button>
            <button onClick={displayManageWeight}>Manage Weight</button>
            <button onClick={displayBeWell}>Be Well</button>
            <button onClick={displayEnjoyTreat}>Enjoy a Treat</button>
            <button onClick={displayKidsMenu}>Kids Menu</button>
            {component}

        </div>
    </>
  )
}
