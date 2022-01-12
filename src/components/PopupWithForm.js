import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupSubmit = popupSubmit;
  }

  _getInputValues() {
    return this._popup.querySelectorAll('.popup__form-element');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => this._popupSubmit(evt));
  }
}