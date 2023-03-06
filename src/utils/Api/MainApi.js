import { mainApiConfig } from '../ApiConfig';

class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  likeCard({country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN}) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN }),
    }).then((res) => this._handleResponce(res));
  }

  dislikeCard(movieId){
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({ movieId })
    }).then((res) => this._handleResponce(res))
  }

  createUser({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._handleResponce(res));
  }

  signin({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => this._handleResponce(res));
  }

  updateUser({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    }).then((res) => this._handleResponce(res));
  }

  getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => this._handleResponce(res));
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then((res) => this._handleResponce(res));
  }

  getMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
    }).then((res) => this._handleResponce(res));
  }

  injectToken() {
    const token = localStorage.getItem('jwt');

    this._headers = { ...this._headers, authorization: `Bearer ${token}` };
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    throw res;
  }
}

const mainApi = new MainApi(mainApiConfig);

export default mainApi;
