import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(evt) {
    const popupPhotoCard = document.querySelector('.popup__photo-element');
    const popupPhotoTitle = document.querySelector('.popup__photo-title');
    popupPhotoCard.src = evt.target.src;
    popupPhotoCard.alt = evt.target.alt;
    popupPhotoTitle.textContent = evt.target.alt;
    super.open();
  }
}