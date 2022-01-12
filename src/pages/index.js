import './index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import { 
  editButton, 
  addButton, 
  popupEditSelector, 
  popupAddSelector,
  popupPhotoSelector,
  popupEditForm,
  popupAddForm,
  nameSelector,
  aboutSelector,
  popupName,
  popupAbout,
  cardTemplate,
  initialCardsData,
  data
} from '../utils/constants.js'

const validateAddForm = new FormValidator(data, popupAddForm);
const validateEditForm = new FormValidator(data, popupEditForm);
const popupPhoto = new PopupWithImage(popupPhotoSelector);
const userInfo = new UserInfo({ nameSelector, aboutSelector });
const popupEdit = new PopupWithForm(popupEditSelector, submitEditForm)
const popupAdd = new PopupWithForm(popupAddSelector, submitAddForm)

//Добавляем 6 стандартных карточек через js
createCard(initialCardsData)

//Валидируем обе формы первоначально
validateAddForm.enableValidation()
validateEditForm.enableValidation()

function createCard(items) {
  const cardList = new Section({ 
    items,
    rendered: (item) => {
      const card = new Card(item.name, item.link, cardTemplate, handleCardClick)
      const newCard = card.addElement()
      cardList.addItem(newCard);
    }
  },'.elements')
  cardList.renderItems();
}

function handleCardClick(evt) {
  popupPhoto.open(evt);
}

function submitEditForm(evt) {
  evt.preventDefault();
  userInfo.setUserInfo(popupName, popupAbout);
  popupEdit.close(userInfo.getUserInfo().name, userInfo.getUserInfo().about);
}

function submitAddForm(evt) {
  evt.preventDefault();
  const data = [{
    name: popupAdd._getInputValues()[0].value,
    link: popupAdd._getInputValues()[1].value,
  }]
  createCard(data)
  popupAdd.close();
}

function setInputValues(popup, firstValue, secondValue) {
  popup._getInputValues()[0].value = firstValue;
  popup._getInputValues()[1].value = secondValue;
}

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupPhoto.setEventListeners();

editButton.addEventListener('click', () => {
  setInputValues(popupEdit, userInfo.getUserInfo().name, userInfo.getUserInfo().about);
  validateEditForm.resetForm();
  popupEdit.open();
});

addButton.addEventListener('click', () => {
  setInputValues(popupAdd, '', '');
  validateAddForm.resetForm();
  popupAdd.open();
});