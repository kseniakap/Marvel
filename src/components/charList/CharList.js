import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = () => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(230);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  updateList = () => {
    this.onRequest();
  };

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

  const onCharListLoaded = (newcharList) => {
    let ended = false;
    if (newcharList.length < 9) {
      ended = true;
    }
    //проверка на то, что персонажи закончились
    setCharList((charList) => [...charList, ...newcharList]);
    setLoading((loading) => false);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const onError = () => {
    this.setState({ loading: false, error: true });
    setError(true);
    setLoading(false);
  };

  const renderItems = (arr) => {
    const items = arr.map((item) => {
      let styleImg = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        styleImg = { objectFit: "unset" };
      }
      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt="abyss" style={styleImg} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };


  const items = this.renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        disabled={newItemLoading}
        onClick={() => this.onRequest(offset)}
        style={{ display: charEnded ? "none" : "block" }}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
