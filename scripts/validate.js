function enableValidation (obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
    
        setEventListeners(formElement, obj);
    });
};//проходим по формам для валидации

function setEventListeners (formElement, obj) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach((inputElement) => {
        if (inputElement.value === '' || inputElement.validity.valid) {
            hideInputError(formElement, inputElement, obj);
        }
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};//проходим по инпутам формы, проверяем их на валидность до внесения данных и во время внесения

function toggleButtonState (inputList, buttonElement, obj) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(obj.inactiveButtonClass);
    }
};//переключатель для активации кнопки при валидности данных

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};//возвращаем правда/неправда при валидности инпута в форме

function checkInputValidity (formElement, inputElement, obj) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, obj, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement, obj);
    }
};//есть ошибки в инпутах или нет

function showInputError (formElement, inputElement, obj, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};//если данные не валидны - выдаем ошибку
  
function hideInputError (formElement, inputElement, obj) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
};//если данные валидны - скрываем ошибку