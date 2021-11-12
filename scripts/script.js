const popAddExit = document.querySelector('.popup_add .popup__close');
const popEditExit = document.querySelector('.popup_edit .popup__close');
const popPhotoExit = document.querySelector('.popup_photo .popup__close');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popEdit = document.querySelector('.popup_edit');
const popAdd = document.querySelector('.popup_add');
const popPhoto = document.querySelector('.popup_photo');
const popupEditForm = document.querySelector('[name="edit-profile"]');
const popupAddForm = document.querySelector('[name="add-element"]');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const popupName = document.querySelector('[name="name-profile"]');
const popupAbout = document.querySelector('[name="about-profile"]');
const elementTemplate = document.querySelector('#element').content; 
const elements = document.querySelector('.elements');
const popupTitle = document.querySelector('[name="title-element"]');
const popupLink = document.querySelector('[name="link-element"]');
const popupPhotoTitle = document.querySelector('.popup__photo-title');
const popupPhotoCard = document.querySelector('.popup__photo-element');
const image = document.querySelectorAll('.element__image');
console.log(image)
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup(evt, popup) {
  popupName.value = name.textContent;
  popupAbout.value = about.textContent;
  popupPhotoCard.style.backgroundImage = `url('${evt.target.src}')`;
  popupPhotoTitle.textContent = evt.target.alt;
  popupClose(popup);
}

function popupClose(popup) {
  popup.classList.toggle('popup_opened');
}

//Добавляем 6 стандартных карточек через js
(function () {
  initialCards.forEach ((initialCards) => {
    addElement(initialCards);
  });
})();

function addElement(initialCards) {
  const userElement = elementTemplate.querySelector('.element').cloneNode(true);
  userElement.querySelector('.element__image').src = initialCards.link;
  userElement.querySelector('.element__image').alt = initialCards.name;
  userElement.querySelector('.element__description>.element__title').textContent = initialCards.name;
  userElement.querySelector('.element__description>.element__title').title = initialCards.name;
  elements.prepend(userElement);
}

function createCard(evt) {
  evt.preventDefault();
  const card = {};
  card.name = popupTitle.value;
  card.link = popupLink.value;
  console.log(card)
  addElement(card);
  popupClose(popAdd);
}

function EditformSubmitHandler (evt) {
  evt.preventDefault(); 
  name.textContent = popupName.value;
  about.textContent = popupAbout.value;
  popupClose(popEdit);
}

editButton.addEventListener('click', () => openPopup(event, popEdit));
addButton.addEventListener('click', () => openPopup(event, popAdd));
image.forEach(image => image.addEventListener('click', () => openPopup(event,popPhoto)));
popAddExit.addEventListener('click', () => popupClose(popAdd));
popEditExit.addEventListener('click', () => popupClose(popEdit));
popPhotoExit.addEventListener('click', () => popupClose(popPhoto));
popupEditForm.addEventListener('submit', EditformSubmitHandler);
popupAddForm.addEventListener('submit', createCard);