class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  async _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const err = await res.json();
    return Promise.reject(err); //обработка ответа от сервера повторяется, решил выделить в отдельный метод
  }

  _getData(path) {
    return fetch(`${this._baseUrl}${path}`, {
      credentials: 'include',
    }).then((res) => this._handleResponse(res));
  }

  getUserInfo() {
    return this._getData('/users/me');
  }

  getInitialCards() {
    return this._getData('/cards');
  }

  _changeData(data, path) {
    return fetch(`${this._baseUrl}${path}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((res) => this._handleResponse(res));
  }

  setUserInfo(data) {
    return this._changeData(data, '/users/me');
  }

  setAvatar(data) {
    return this._changeData(data, '/users/me/avatar');
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((res) => this._handleResponse(res));
  }

  _handleLike(method, id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      credentials: 'include',
    }).then((res) => this._handleResponse(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this._handleLike('DELETE', id) : this._handleLike('PUT', id);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
});

export default api;
