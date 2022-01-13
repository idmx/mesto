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

  setUserInfo(popupName, popupAbout) {
    this._name.textContent = popupName;
    this._about.textContent = popupAbout;
  }
}