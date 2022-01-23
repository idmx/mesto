import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(src, alt) {
    const popupPhotoCard = document.querySelector('.popup__photo-element');
    const popupPhotoTitle = document.querySelector('.popup__photo-title');
    popupPhotoCard.src = src;
    popupPhotoCard.alt = alt;
    popupPhotoTitle.textContent = alt;
    super.open();
  }
}