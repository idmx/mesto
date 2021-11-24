function enableValidation(elementsData) {
  const formList = Array.from(document.querySelectorAll(elementsData.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(elementsData.inputSelector));
    const buttonElement = formElement.querySelector(elementsData.submitButtonSelector);
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputList, buttonElement, elementsData.inactiveButtonClass, 
    elementsData.inputErrorClass, elementsData.errorClass);
  });
};

function setEventListeners (formElement, inputList, buttonElement, buttonInactive, inputFieldError, inputError) {
  toggleButtonState(inputList, buttonElement,buttonInactive);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputFieldError, inputError);
      toggleButtonState(inputList, buttonElement, buttonInactive);
    });
  });
};

function toggleButtonState(inputList, buttonElement, buttonInactive) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(buttonInactive);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(buttonInactive);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  });
}

function checkInputValidity (formElement, inputElement, inputFieldError, inputError) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputFieldError, inputError);
  } else {
    hideInputError(formElement, inputElement, inputFieldError, inputError);
  }
};

function generateError (inputElement) {
  let errorMessage;
  switch(inputElement.id) {
    case 'name-input':
    case 'about-input':
    case 'title-input':
      if (inputElement.value.length) errorMessage =  `Минимальное количество символов: 2. Длина текста сейчас: ${inputElement.value.length} символ`;
      else errorMessage = 'Вы пропустили это поле';
      break;
    case 'link-input':
      if (inputElement.value.length) errorMessage =  'Введите адрес сайта';
      else errorMessage = 'Вы пропустили это поле';
      break;
    default:
      errorMessage = 'Вы пропустили это поле';
  }
  return errorMessage;
}

function showInputError (formElement, inputElement, inputFieldError, inputError) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const errorMessage = generateError(inputElement);
  inputElement.classList.add(inputFieldError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputError);
};

function hideInputError (formElement, inputElement, inputFieldError, inputError) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputFieldError);
  errorElement.classList.remove(inputError);
  errorElement.textContent = '';
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-element',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__form-element_type_error',
  errorClass: 'popup__error_visible'
});