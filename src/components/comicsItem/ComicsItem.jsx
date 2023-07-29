import React, {useState} from 'react';

import srcImg from "./../../resources/img/x-men.png"

import  "./comicsItem.scss"

const ComicsItem = () => {
  return (
    <div className='item__card'>
        <img src={srcImg} alt="" className="item__img" />
        <div className="item__info">
            <div className="item__title">
            X-Men: Days of Future Past
            </div>
            <p className="item__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
            <p className="item__descr">144 pages</p>
            <p className="item__descr">Language: en-us</p>
            <div className="item__price">9.99$</div>
        </div>
        <a href="#" className="item__back">Back to all</a>
    </div>
  )
}

export default ComicsItem
