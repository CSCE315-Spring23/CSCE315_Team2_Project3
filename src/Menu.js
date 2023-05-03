import React from 'react';
import GetFit from './GetFit';
import BeWell from './BeWell';
import KidsMenu from './KidsMenu';
import EnjoyTreat from './EnjoyTreat';
import FeelEnergized from './FeelEnergized';
import ManageWeight from './ManageWeight';
import MenuNavbar from './MenuNavbar';

export default function Menu() {

    let component;

    console.log(component);

    switch(window.location.pathname) {

        case "/MenuBoard/FeelEnergized":
            component = <FeelEnergized/>
            break

        case "/MenuBoard/GetFit":
            component = <GetFit/>
            break

        case "/MenuBoard/BeWell":
          component = <BeWell/>
          break

        case "/MenuBoard/KidsMenu":
          component = <KidsMenu/>
          break

        case "/MenuBoard/ManageWeight":
          component = <ManageWeight/>
          break

        case "/MenuBoard/EnjoyTreat":
          component = <EnjoyTreat/>
          break

        default:
          component = <FeelEnergized/>
          break
    }

  return (
    <>
        <h1>Menu</h1>
        <MenuNavbar/>
        <div>{component}</div>
    </>
  )
}
