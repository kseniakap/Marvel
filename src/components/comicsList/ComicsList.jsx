import React, {useState, useEffect}from 'react';
import useMarvelService from "../../services/MarvelService";

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from "../spinner/Spinner";


import "../../style/button.scss"
import "./comicsList.scss"


const ComicsList = () => {
   const {getAllComics, loading, error} = useMarvelService();

   const[comicsList, setComicsList] = useState([]);

   const [newComicsLoading, setNewComicsLoading] = useState(false);
   const [offset, setOffset] = useState (27);
   const [comicsEnded, setEnded] = useState (false);

   useEffect(()=>{
    onRequest(offset, true)
   }, [])
   
   const onRequest = (offseet, initial)=>{
    initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
    getAllComics(offset).then(onComicsLoaded);
   }

   const onComicsLoaded = (newComics)=>{
    let ended = false;
    if(newComics.length < 8) {
      ended = true
    }
    setComicsList([...comicsList, ...newComics]);
    setNewComicsLoading(false);
    setOffset((offset)=>offset+8);
    setEnded(comicsEnded => ended);
   }

   function renderComics(arr){
    const items = arr.map((item, i)=>{
      return (
        <li key={i} className="comics__card">
          <a href="#">
            <img src={item.thumbnail} alt={item.title} className="comics__img" />
            <div className="comics__title">{item.title}</div>
            <div className="comics__price">{item.price}</div>

          </a>
        </li>
      )
    })
    return (
      <ul className="comics__list">{items}</ul>
    )
   }
   
   const items = renderComics(comicsList);

   const errorMessage = error ? <ErrorMessage/> : null;
   const spinner = loading && !newComicsLoading ? <Spinner/> : null;

  return (
    <div className="comics__wrapper" >
         {errorMessage}
          {spinner}
          {items}
          <button className='button button__main button__long' disabled={newComicsLoading} style={{'display' : comicsEnded ? 'none' : 'block' }} onClick={() => onRequest(offset)}>
                <div className='inner'>load more</div>
            </button>
      
    </div>
  )
}

export default ComicsList
