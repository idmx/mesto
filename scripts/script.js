let pop_exit = document.querySelector('.popup__close');
let pop_open = document.querySelector('.profile__edit-button');
let popup_form = document.querySelector('.popup__form');
let state = 0;

function popup() {
  let pop = document.querySelector('.popup');
  pop.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  let pop = document.querySelector('.popup');
  let popup_name = document.querySelector('.popup__name');
  let popup_about = document.querySelector('.popup__about');
  let name = document.querySelector('.profile__name');
  let about = document.querySelector('.profile__about');
  name.textContent = name.title = (popup_form[0].value || "Аноним");
  about.textContent = about.title = (popup_form[1].value || "Информация отсутствует");
  pop.classList.toggle('popup_opened');
}

pop_open.addEventListener('click', popup);
pop_exit.addEventListener('click', popup);
popup_form.addEventListener('submit', formSubmitHandler);