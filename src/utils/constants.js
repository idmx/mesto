import crimeaImage from '../images/Crimea.jpg';
import borImage from '../images/bor.jpg';
import elaginImage from '../images//elagin.jpg';
import kareliaImage from '../images/karelia.jpg';
import moscowCityImage from '../images/moscow_city.jpg';
import zenitImage from '../images/zenit.jpg';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditSelector = '.popup_edit';
const popupAddSelector = '.popup_add';
const popupPhotoSelector = '.popup_photo';
const popupEditForm = document.querySelector('[name="edit-profile"]');
const popupAddForm = document.querySelector('[name="add-element"]');
const nameSelector = '.profile__name';
const aboutSelector = '.profile__about';
const popupName = popupEditForm.querySelector('#name-input');
const popupAbout = popupEditForm.querySelector('#about-input');
const cardTemplate = ('#element');

const initialCardsData = [
  {
    name: 'Крым',
    link: crimeaImage
  },
  {
    name: 'Сосновый бор',
    link: borImage
  },
  {
    name: 'Елагин остров',
    link: elaginImage
  },
  {
    name: 'Ладожские шхеры',
    link: kareliaImage
  },
  {
    name: 'Москва Сити',
    link: moscowCityImage
  },
  {
    name: 'Зенит арена',
    link: zenitImage
  }
];

const data = {
  inputSelector: '.popup__form-element',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__form-element_type_error',
  errorClass: 'popup__error_visible'
}

export { 
  editButton, addButton, popupEditSelector, popupAddSelector,
  popupPhotoSelector, popupEditForm, popupAddForm, nameSelector,
  aboutSelector, popupName, popupAbout, cardTemplate, initialCardsData, data
} 