let pop_exit = document.querySelector('.popup__close');
let pop_open = document.querySelector('.profile__edit-button');
let pop_save = document.querySelector('.popup__save');
let state = 0;

function popup(state) {
  let pop = document.querySelector('.popup');
  if (state) {
    state = 0;
    let popup_name = document.querySelector('.popup__name');
    let popup_about = document.querySelector('.popup__about');
    let name = document.querySelector('.profile__name');
    let about = document.querySelector('.profile__about');
    name.textContent = popup_name.value;
    about.textContent = popup_about.value;
    pop.classList.toggle('popup_opened');
  }
  else {
    pop.classList.toggle('popup_opened');
  }
}


pop_open.addEventListener('click', {handleEvent: popup, state: 0});
pop_exit.addEventListener('click', {handleEvent: popup, state: 0});
pop_save.addEventListener('click', {handleEvent: popup, state: 1});