let popExit = document.querySelector('.popup__close');
let popOpen = document.querySelector('.profile__edit-button');
let popupForm = document.querySelector('.popup__form');
let pop = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');
let popupName = popupForm[0];
let popupAbout = popupForm[1];

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
  name.textContent = popupForm[0].value;
  about.textContent = popupForm[1].value;
  pop.classList.toggle('popup_opened');
}

popOpen.addEventListener('click', popupOpen);
popExit.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);