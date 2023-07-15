import { Component } from "react";
import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
  };
  marvelService = new MarvelService();

  componentDidMount() {
    this.updateList();
  }

  updateList = () => {
    this.onRequest();
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };
  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  onCharListLoaded = (charList) => {
    this.setState({ charList, loading: false });
  };
  onError = () => {
    this.setState({ loading: false, error: true });
  };

  renderItems = (arr) => {
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

  render() {
    const { charList, loading, error } = this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;