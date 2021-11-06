let popExit = document.querySelector('.popup__close');
let popOpen = document.querySelector('.profile__edit-button');
let pop = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');
let popupName = document.querySelector('[name="name-profile"]');
let popupAbout = document.querySelector('[name="about-profile"]');

function popupOpen() {
  popupName.value = name.textContent;
  popupAbout.value = about.textContent;
  popupClose();
}

function popupClose() {
  pop.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  name.textContent = popupName.value;
  about.textContent = popupAbout.value;
  popupClose();
}

popOpen.addEventListener('click', popupOpen);
popExit.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);