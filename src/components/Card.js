// import { popupPhotoCard, popupPhotoTitle, popupPhoto, openPopup } from "./script.js"

export default class Card {
  constructor(photoTitle, photoLink, cardTemplate, handleCardClick) { 
    this._photoTitle = photoTitle;
    this._photoLink = photoLink;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._cardTemplate)
    .content.querySelector('.element')
    .cloneNode(true);
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', this._handleCardClick);
    this._elementLike = this._element.querySelector('.element__like');
    this._elementLike.addEventListener('click', () => this._toggleLike());
    this._element.querySelector('.element__trash').addEventListener('click', () => this._deletePhoto());
  }

  // _openPhotoPopup(evt) {
  //   popupPhotoCard.src = evt.target.src;
  //   popupPhotoCard.alt = evt.target.alt;
  //   popupPhotoTitle.textContent = evt.target.alt;
  //   openPopup(popupPhoto);
  // }

  _toggleLike() {
    this._elementLike.classList.toggle('element__like_active');
  }

  _deletePhoto() {
    this._element.remove();
    this._element = null;
  }

  addElement() { 
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._elementImage.src = this._photoLink;
    this._elementImage.alt = this._photoTitle;
    this._element.querySelector('.element__description>.element__title').textContent = this._photoTitle;
    this._element.querySelector('.element__description>.element__title').title = this._photoTitle;
    return this._element;
  }
}