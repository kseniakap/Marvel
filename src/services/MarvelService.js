import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=6de497eb0282833ff271cd4509e69c6d";
  const _baseOffset = 230;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacterId = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    // https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=0&apikey=3a5c61ca0f923752c71ccc19ae76e23f
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };
  

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 200)}...`
        : "Данных об этом персонаже нет",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "У этого комикса нет описания",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "Нет информации о количестве страниц",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "NOT AVAILABLE",
      // language: comics.textObjects[0].language || "en-us",
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacterId,
    clearError,
    getAllComics,
    getComics,
  };
};

export default useMarvelService;
