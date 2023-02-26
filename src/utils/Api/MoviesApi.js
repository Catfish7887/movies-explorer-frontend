import { moviesApiConfig } from '../ApiConfig';

class MoviesApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getFilms = () => {
    return fetch(`${this._url}/`, {
      headers: this._headers,
    }).then((res) => this._handleResponce(res));
  };

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Статус ошибки: ${res.status}`);
  }
}

const moviesApi = new MoviesApi(moviesApiConfig);

export default moviesApi;
