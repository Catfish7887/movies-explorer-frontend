import { mainApiConfig } from "../ApiConfig";

class MainApi {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }

  createUser({name, email, password}){
    return fetch(`${this._url}/signup`, {
      method:'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password })
    })
      .then(res => this._handleResponce(res))
  };

  signin({email, password}) {
    return fetch(`${this._url}/signin`, {
      method:'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
      .then(res => this._handleResponce(res))
  };

  getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => this._handleResponce(res))
  };

  injectToken() {
    const token = localStorage.getItem('jwt')

    this._headers = {...this._headers, 'authorization':`Bearer ${token}`}
  };

  _handleResponce(res) {
    if (res.ok) {
      return res.json()
    }
    // console.log(res)
    throw new Error(`Статус ошибки: ${res.status}`)

  }
};

const mainApi = new MainApi(mainApiConfig);

export default mainApi;
