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
}

//если нажата кнопка добавления
function openAddPopup() {
  popupTitle.value = '';
  popupLink.value = '';
  togglePopup(popupAdd);
}

//если нажата фотография
function openPhotoPopup(evt) {
  popupPhotoCard.src = evt.target.src;
  popupPhotoCard.alt = popupPhotoTitle.textContent = evt.target.alt;
  togglePopup(popupPhoto);
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function deletePhoto(evt) {
  evt.target.closest('.element').remove();
}

//Добавляем 6 стандартных карточек через js
initialCardsData.forEach ((cardData) => {
    card = addElement(cardData);
    cards.prepend(card);
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

function createCard(evt) {
  evt.preventDefault();
  card = addElement({name: popupTitle.value, link: popupLink.value});
  cards.prepend(card);
  togglePopup(popupAdd);
}

function editformSubmitHandler (evt) {
  evt.preventDefault(); 
  name.textContent = popupName.value;
  about.textContent = popupAbout.value;
  togglePopup(popupEdit);
}

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
popupAddCloseButton.addEventListener('click', () => togglePopup(popupAdd));
popupEditCloseButton.addEventListener('click', () => togglePopup(popupEdit));
popupPhotoCloseButton.addEventListener('click', () => togglePopup(popupPhoto));
popupEditForm.addEventListener('submit', editformSubmitHandler);
popupAddForm.addEventListener('submit', createCard);