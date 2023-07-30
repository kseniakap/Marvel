import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import AppBaner from "../appBaner/AppBaner";

import "./itemComicsPage.scss";

const ItemComicsPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);

  const { error, loading, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, price, language } = comic;

  return (
    <div className="item__card">
      <img src={thumbnail} alt={title} className="item__img" />
      <div className="item__info">
        <div className="item__title">{title}</div>
        <p className="item__descr">{description}</p>
        <p className="item__descr">{pageCount}</p>
        <p className="item__descr">Language: {language}</p>
        <div className="item__price">{price}</div>
      </div>
      <Link to="/comics" className="item__back">
        Back to all
      </Link>
    </div>
  );
};

export default ItemComicsPage;
