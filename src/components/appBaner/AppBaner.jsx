import React from 'react';
import marvelImg from "./../../resources/img/Avengers.png";
import logoImg from "./../../resources/img/Avengers_logo.png"

import "./appBaner.scss"
const AppBaner = () => {
  return (
    <div className='baner__container'>
     <div className='baner__left'>
        <img src={marvelImg} alt="marvel" />
        <div className="baner__text">New comics every week!
        Stay tuned!</div>
     </div>
        <img src={logoImg} alt="logo" />      
    </div>
  )
}

export default AppBaner
