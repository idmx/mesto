export default class Api {
  constructor(options) {
    this.options = options;
  }

  _getProfileInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }

  setUserName(name, about) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
  }

  setAvatar(avatar) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar
      })
    })
  }

  _getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }

  getData() {
    return Promise.all([this._getProfileInfo(), this._getInitialCards()])
  }

  setLikePhoto(cardId, method) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this.options.headers
    })
  }

  addCard(name, link) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        link,
      })
    })
  }

  deleteCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.options.headers,
    })
  }
}