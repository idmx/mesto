import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit, resetForm) {
    super(popupSelector);
    this._popupSubmit = popupSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__form-element');
    this._resetForm = resetForm;
  }

  getInputValues() {
    this._formValues = [];
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues
  }

  setInputValues(values) {
    this._inputList.forEach(input => input.value = values[input.name]);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => this._popupSubmit(evt));
  }

  close() {
    super.close();
    this._resetForm();
  }
}