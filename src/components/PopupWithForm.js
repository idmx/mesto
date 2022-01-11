import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit, resetForm) {
    super(popupSelector);
    this._popupSubmit = popupSubmit;
    //this._resetForm = resetForm;
  }

  _getInputValues() {
    return this._popup.querySelector('.popup__form-element');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => this._popupSubmit());
  }

  close() {
    super.close();
    //this._resetForm();
  }
}