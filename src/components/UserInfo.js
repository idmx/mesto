export default class UserInfo {
  constructor({ nameSelector, aboutSelector, userAvatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setAvatar(url) {
    this._avatar.style.backgroundImage = `url(${url})`;
  }

  setUserInfo(popupName, popupAbout) {
    this._name.textContent = popupName;
    this._about.textContent = popupAbout;
  }
}