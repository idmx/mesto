let popExit = document.querySelector('.popup__close');
let popOpen = document.querySelector('.profile__edit-button');
let popupForm = document.querySelector('.popup__form');
let pop = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

function popupOpen() {
  popupForm[0].value = name.textContent;
  popupForm[1].value = about.textContent;
  pop.classList.toggle('popup_opened');
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