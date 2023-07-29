import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import ComicsItem from "../comicsItem/ComicsItem";

import decoration from "../../resources/img/vision.png";
import AppBaner from "../appBaner/AppBaner";


const App = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        {/* <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>

        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />{" "}
          </ErrorBoundary>

          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" /> */}
        <AppBaner/>
        {/* <ComicsList/> */}
        <ComicsItem/>
      </main>
    </div>
  );
};

export default App;
