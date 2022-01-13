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
  cardTemplate,
  initialCardsData,
  data,
  popupAddTitle,
  popupAddLink,
  popupEditName,
  popupEditAbout
} from '../utils/constants.js'

const validateAddForm = new FormValidator(data, popupAddForm);
const validateEditForm = new FormValidator(data, popupEditForm);
const popupPhoto = new PopupWithImage(popupPhotoSelector);
const userInfo = new UserInfo({ nameSelector, aboutSelector });
const popupEdit = new PopupWithForm(popupEditSelector, submitEditForm, () => {
  setInputValues(popupEdit, userInfo.getUserInfo().name, userInfo.getUserInfo().about,
    popupEditName, popupEditAbout);
  validateEditForm.resetForm();
});
const popupAdd = new PopupWithForm(popupAddSelector, submitAddForm, () => {
  setInputValues(popupAdd, '', '', popupAddTitle, popupAddLink);
  validateAddForm.resetForm();
});

const cardList = new Section(
  { 
    renderer: (item) => {
      const newCard = createCard(item);
      cardList.addItem(newCard);
    }
  },
  '.elements'
);

//Добавляем 6 стандартных карточек через js
cardList.renderItems(initialCardsData);

//Валидируем обе формы первоначально
validateAddForm.enableValidation();
validateEditForm.enableValidation();

function createCard(item) {
  const card = new Card(item.name, item.link, cardTemplate, handleCardClick);
  const newCard = card.addElement();
  return newCard;
}

function handleCardClick(evt) {
  popupPhoto.open(evt);
}

function submitEditForm(evt) {
  evt.preventDefault();
  userInfo.setUserInfo(popupEdit.getInputValues()[popupEditName],
    popupEdit.getInputValues()[popupEditAbout]);
  popupEdit.close();
}

function submitAddForm(evt) {
  evt.preventDefault();
  const data = [{
    name: popupAdd.getInputValues()[popupAddTitle],
    link: popupAdd.getInputValues()[popupAddLink],
  }]
  cardList.renderItems(data);
  popupAdd.close();
}

function setInputValues(popup, firstValue, secondValue, firstInputName, secondInputName) {
  const values = {[firstInputName]: firstValue, [secondInputName]: secondValue};
  popup.setInputValues(values);
}

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupPhoto.setEventListeners();

editButton.addEventListener('click', () => {
  popupEdit.open();
});

addButton.addEventListener('click', () => {
  popupAdd.open();
});