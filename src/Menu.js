import React from 'react';
//import MenuNavbar from './MenuNavbar';
// import GetFit from './GetFit';
// import BeWell from './BeWell';
// import KidsMenu from './KidsMenu';
// import EnjoyTreat from './EnjoyTreat';
import FeelEnergized from './FeelEnergized';
// import ManageWeight from './ManageWeight';

export default function Menu() {

    let component;

    console.log(component);

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
    </>
  )
}
