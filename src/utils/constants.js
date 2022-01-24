const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar');
const popupEditSelector = '.popup_edit';
const popupAddSelector = '.popup_add';
const popupPhotoSelector = '.popup_photo';
const popupAvatarSelector = '.popup_avatar';
const popupDeleteSelector = '.popup_delete';
const popupEditAvatarForm = document.querySelector('[name="edit-avatar"]');
const popupEditForm = document.querySelector('[name="edit-profile"]');
const popupAddForm = document.querySelector('[name="add-element"]');
const popupDelete = document.querySelector(popupDeleteSelector);
const nameSelector = '.profile__name';
const aboutSelector = '.profile__about';
const cardTemplate = ('#element');
const popupAddTitle = 'title-element';
const popupAddLink = 'link-element';
const popupAvatarLink = 'link-avatar';
const popupEditName = 'name-profile';
const popupEditAbout = 'about-profile';
const userAvatarSelector = '.profile__avatar';
const popupSaveAvatarButton = popupEditAvatarForm.querySelector('.popup__save');
const popupSaveEditButton = popupEditForm.querySelector('.popup__save');
const popupSaveAddButton = popupAddForm.querySelector('.popup__save');
const popupDeleteButton = popupDelete.querySelector('.popup__save');

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
  aboutSelector, cardTemplate, data, popupAvatarLink,
  popupAddTitle, popupAddLink, popupEditName, popupEditAbout,
  popupAvatarSelector, popupEditAvatarForm, editAvatarButton,
  userAvatarSelector, popupSaveAvatarButton, popupSaveEditButton, popupSaveAddButton,
  popupDeleteButton, popupDeleteSelector
} 