import { popupPhotoCard, popupPhotoTitle, popupPhoto, openPopup } from "./script.js"

export default class Card {
  constructor(photoTitle, photoLink, cardTemplate) {
    this._photoTitle = photoTitle;
    this._photoLink = photoLink;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    return document.querySelector(this._cardTemplate)
    .content.querySelector('.element')
    .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', this._openPhotoPopup);
    this._element.querySelector('.element__like').addEventListener('click', this._toggleLike);
    this._element.querySelector('.element__trash').addEventListener('click', this._deletePhoto);
  }

  _openPhotoPopup(evt) {
    popupPhotoCard.src = evt.target.src;
    popupPhotoCard.alt = evt.target.alt;
    popupPhotoTitle.textContent = evt.target.alt;
    openPopup(popupPhoto);
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  _deletePhoto(evt) {
    evt.target.closest('.element').remove();
  }

  addElement() {; 
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._photoLink;
    this._element.querySelector('.element__image').alt = this._photoTitle;
    this._element.querySelector('.element__description>.element__title').textContent = this._photoTitle;
    this._element.querySelector('.element__description>.element__title').title = this._photoTitle;
    return this._element;
  }
}