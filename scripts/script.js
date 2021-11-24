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
const cardTemplate = document.querySelector('#element').content; 
const cards = document.querySelector('.elements');
const popupTitle = document.querySelector('[name="title-element"]');
const popupLink = document.querySelector('[name="link-element"]');
const popupPhotoTitle = document.querySelector('.popup__photo-title');
const popupPhotoCard = document.querySelector('.popup__photo-element');
const popupOverlays = Array.from(document.querySelectorAll('.popup'));

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

//если нажата кнопка редактирования
function openEditPopup() {
  popupName.value = name.textContent;
  popupAbout.value = about.textContent;
  togglePopup(popupEdit);
  document.addEventListener('keydown', esc = escHandler.bind(null,popupEdit));
}

//если нажата кнопка добавления
function openAddPopup(evt) {
  popupTitle.value = '';
  popupLink.value = '';
  togglePopup(popupAdd);
  document.addEventListener('keydown', esc = escHandler.bind(null,popupAdd));
}

//если нажата фотография
function openPhotoPopup(evt) {
  popupPhotoCard.src = evt.target.src;
  popupPhotoCard.alt = evt.target.alt;
  popupPhotoTitle.textContent = evt.target.alt;
  togglePopup(popupPhoto);
  document.addEventListener('keydown', esc = escHandler.bind(null,popupPhoto));
}

function escHandler(popup, evt) {
  if(evt.key === 'Escape'){
    togglePopup(popup);
    document.removeEventListener('keydown', esc);
  } 
}

function togglePopup(popup) {
  if(popup !== popupPhoto) validationForm(popup);
  popup.classList.toggle('popup_opened');
}

//После закрытия формы необходимо убрать поля ошибок и деактивировать/активировать кнопку
function validationForm(popup) {
  const formElement = popup.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-element'));
  const buttonElement = formElement.querySelector('.popup__save');
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, 'popup__form-element_type_error', 'popup__error_visible');
    toggleButtonState(inputList, buttonElement, 'popup__save_disabled');
  });
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function deletePhoto(evt) {
  evt.target.closest('.element').remove();
}

//Добавляем 6 стандартных карточек через js
initialCardsData.forEach ((cardData) => {
  renderCard(cardData);
});

function addElement(cardData) {
  const userCard = cardTemplate.querySelector('.element').cloneNode(true);
  userCard.querySelector('.element__image').src = cardData.link;
  userCard.querySelector('.element__image').alt = cardData.name;
  userCard.querySelector('.element__description>.element__title').textContent = cardData.name;
  userCard.querySelector('.element__description>.element__title').title = cardData.name;
  //вешаем обработчики на новые добавленные элементы
  userCard.querySelector('.element__image').addEventListener('click', openPhotoPopup);
  userCard.querySelector('.element__like').addEventListener('click', toggleLike);
  userCard.querySelector('.element__trash').addEventListener('click', deletePhoto);
  return userCard;
}

function renderCard(cardData) {
  const card = addElement(cardData);
  cards.prepend(card);
}

function createCard(evt) {
  evt.preventDefault();
  const cardData = {name: popupTitle.value, link: popupLink.value};
  renderCard(cardData);
  togglePopup(popupAdd);
  document.removeEventListener('keydown', esc);
}

function editFormSubmitHandler (evt) {
  evt.preventDefault(); 
  name.textContent = popupName.value;
  about.textContent = popupAbout.value;
  togglePopup(popupEdit);
  document.removeEventListener('keydown', esc);
}

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
popupAddCloseButton.addEventListener('click', () => togglePopup(popupAdd));
popupEditCloseButton.addEventListener('click', () => togglePopup(popupEdit));
popupPhotoCloseButton.addEventListener('click', () => togglePopup(popupPhoto));
popupEditForm.addEventListener('submit', editFormSubmitHandler);
popupAddForm.addEventListener('submit', createCard);
//Закрытие попапов нажатием на оверлей
popupOverlays.forEach(popupOverlay => {
  popupOverlay.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) togglePopup(popupOverlay);
  });
});