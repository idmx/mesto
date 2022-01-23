import './index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Popup from '../components/Popup.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
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
  data,
  popupAddTitle,
  popupAddLink,
  popupEditName,
  popupEditAbout,
  popupAvatarSelector,
  popupEditAvatarForm,
  editAvatarButton,
  popupAvatarLink,
  userAvatar,
  popupSaveAvatarButton,
  popupSaveEditButton,
  popupSaveAddButton,
  popupDeleteButton,
  popupDeleteSelector
} from '../utils/constants.js'

let photoId = 0;
const validateAddForm = new FormValidator(data, popupAddForm);
const validateEditForm = new FormValidator(data, popupEditForm);
const validateEditAvatarForm = new FormValidator(data, popupEditAvatarForm);
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

const popupDelete = new Popup(popupDeleteSelector)

const popupEditAvatar = new PopupWithForm(popupAvatarSelector, submitEditAvatarForm, () => {
  setInputValues(popupEditAvatar, '', '', popupAvatarLink);
  validateEditAvatarForm.resetForm();
});

const cardList = new Section(
  { 
    renderer: (item, userInfoId) => {
      const newCard = createCard(item, userInfoId);
      cardList.addItem(newCard);
    }
  },
  '.elements'
);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: '345e5c19-f25d-4ca1-8647-9df6adf7e21f',
    'Content-Type': 'application/json'
  }
});

//инициализируем начальные данные профиля и добавляем фотографии с сервера
initCards();

//Валидируем обе формы первоначально
validateAddForm.enableValidation();
validateEditForm.enableValidation();
validateEditAvatarForm.enableValidation();

function likePhoto(cardId, method) {
  api.setLikePhoto(cardId, method)
    .then(res => {
      if (res.ok) {
        initCards()
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch(err => {
      console.log(`Ошибка загрузки данных: ${err}`)
    })
}

function initCards() {
  api.getData()
    .then(([userInform, cards]) => {
      userInfo.setUserInfo(userInform.name, userInform.about);
      cardList.renderItems(cards, userInform._id);
      userAvatar.style.backgroundImage = `url(${userInform.avatar})`;
      setInputValues(popupEdit, userInfo.getUserInfo().name, userInfo.getUserInfo().about,
      popupEditName, popupEditAbout);
    })
    .catch(err => {
      console.log(`Ошибка загрузки данных: ${err}`)
    })
}

function touchTrash(cardId) {
  popupDeleteButton.innerHTML = 'Да'
  photoId = cardId
  popupDelete.open();
}

function createCard(item, userInfoId) {
  const card = new Card(item, userInfoId, cardTemplate, handleCardClick, likePhoto, touchTrash);
  const newCard = card.addElement();
  return newCard;
}

function handleCardClick(evt) {
  popupPhoto.open(evt);
}

function clickDelete() {
  popupDeleteButton.innerHTML = 'Сохранение...'
  api.deleteCard(photoId)
    .then(res => {
      if (res.ok) {
        initCards();
        popupDelete.close();
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch(err => {
      console.log(`Ошибка загрузки данных: ${err}`)
  })
}

function submitEditForm(evt) {
  evt.preventDefault();
  popupSaveEditButton.innerHTML = 'Сохранение...'
  userInfo.setUserInfo(popupEdit.getInputValues()[popupEditName],
    popupEdit.getInputValues()[popupEditAbout]);
  api.setUserName(userInfo.getUserInfo().name, userInfo.getUserInfo().about)
    .then(res => {
      if (res.ok) {
        popupEdit.close()
        return res.json()
      }
      return Promise.reject(res.status);
    })
    .catch(err => {
      console.log(`Ошибка загрузки данных: ${err}`)
    })
}

function submitAddForm(evt) {
  evt.preventDefault();
  popupSaveAddButton.innerHTML = 'Сохранение...'
  api.addCard(popupAdd.getInputValues()[popupAddTitle], popupAdd.getInputValues()[popupAddLink])
    .then(res => {
      if (res.ok) {
        initCards(),
        popupAdd.close()
        return res.json()
      }
      return Promise.reject(res.status);
    })
    .catch(err => {
      console.log(`Ошибка загрузки данных: ${err}`)
    })
}

function submitEditAvatarForm(evt) {
  evt.preventDefault();
  popupSaveAvatarButton.innerHTML = 'Сохранение...'
  api.setAvatar(popupEditAvatar.getInputValues()[popupAvatarLink])
    .then(res => {
      if (res.ok) {
        initCards(),
        popupEditAvatar.close()
        return res.json()
      }
      return Promise.reject(res.status);
    })
    .catch(err => {
      console.log(`Ошибка загрузки данных: ${err}`)
    })
}

function setInputValues(popup, firstValue, secondValue, firstInputName, secondInputName) {
  const values = {[firstInputName]: firstValue, [secondInputName]: secondValue};
  popup.setInputValues(values);
}

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupPhoto.setEventListeners();
popupEditAvatar.setEventListeners();
popupDelete.setEventListeners();

popupDeleteButton.addEventListener('click', clickDelete)

editButton.addEventListener('click', () => {
  popupSaveAvatarButton.innerHTML = 'Сохранить'
  popupEdit.open();
});

editAvatarButton.addEventListener('click', () => {
  popupSaveAvatarButton.innerHTML = 'Сохранить'
  popupEditAvatar.open();
});

addButton.addEventListener('click', () => {
  popupSaveAddButton.innerHTML = 'Создать'
  popupAdd.open();
});