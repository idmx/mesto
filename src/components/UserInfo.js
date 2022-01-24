export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setAvatar(url, userAvatar) {
    userAvatar.style.backgroundImage = `url(${url})`;
  }

  setUserInfo(popupName, popupAbout) {
    this._name.textContent = popupName;
    this._about.textContent = popupAbout;
  }
}