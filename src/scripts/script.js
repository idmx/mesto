import Card from "./Card.js"
import FormValidator from "./FormValidator.js"

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_photo');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close');
const popupEditForm = document.querySelector('[name="edit-profile"]');
const popupAddForm = document.querySelector('[name="add-element"]');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const popupName = document.querySelector('[name="name-profile"]');
const popupAbout = document.querySelector('[name="about-profile"]');
const cards = document.querySelector('.elements');
const popupTitle = document.querySelector('[name="title-element"]');
const popupLink = document.querySelector('[name="link-element"]');
const popupPhotoTitle = document.querySelector('.popup__photo-title');
const popupPhotoCard = document.querySelector('.popup__photo-element');
const popupOverlays = Array.from(document.querySelectorAll('.popup'));
const cardTemplate = ('#element');

const initialCardsData = [
  {
    name: 'Крым',
    link: './images/Crimea.jpg'
  },
  {
    name: 'Сосновый бор',
    link: './images/bor.jpg'
  },
  {
    name: 'Елагин остров',
    link: './images//elagin.jpg'
  },
  {
    name: 'Ладожские шхеры',
    link: './images/karelia.jpg'
  },
  {
    name: 'Москва Сити',
    link: './images/moscow_city.jpg'
  },
  {
    name: 'Зенит арена',
    link: './images/zenit.jpg'
  }
];

const data = {
  inputSelector: '.popup__form-element',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__form-element_type_error',
  errorClass: 'popup__error_visible'
}

const validateAddForm = new FormValidator(data, popupAddForm);
const validateEditForm = new FormValidator(data, popupEditForm);

//Добавляем 6 стандартных карточек через js
initialCardsData.forEach((cardData) => {
  createCard(cardData.name, cardData.link);
})

//Валидируем обе формы первоначально
validateAddForm.enableValidation()
validateEditForm.enableValidation()

//если нажата кнопка редактирования
function openEditPopup() {
  popupName.value = name.textContent;
  popupAbout.value = about.textContent;
  validateEditForm.resetForm();
  openPopup(popupEdit);
}

//если нажата кнопка добавления
function openAddPopup(evt) {
  popupTitle.value = '';
  popupLink.value = '';
  validateAddForm.resetForm();
  openPopup(popupAdd);
}

function escHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.toggle('popup_opened');
  document.addEventListener('keydown', escHandler);
}

function closePopup(popup) {
  document.removeEventListener('keydown', escHandler);
  popup.classList.toggle('popup_opened');
}

function editFormSubmitHandler (evt) {
  evt.preventDefault(); 
  name.textContent = popupName.value;
  about.textContent = popupAbout.value;
}

function createCard(popupTitle, popupLink) {
  const card = new Card(popupTitle, popupLink, cardTemplate);
  const newCard = card.addElement();
  addCard(newCard);
}

function addCard(newCard) {
  cards.prepend(newCard);
}

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
popupEditForm.addEventListener('submit', (evt) => {
  editFormSubmitHandler(evt);
  closePopup(popupEdit);
});
popupAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  createCard(popupTitle.value, popupLink.value);
  closePopup(popupAdd);
});
//Закрытие попапов нажатием на оверлей
popupOverlays.forEach(popupOverlay => {
  popupOverlay.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) closePopup(popupOverlay);
  });
});

export { popupPhotoCard, popupPhotoTitle, popupPhoto, openPopup }