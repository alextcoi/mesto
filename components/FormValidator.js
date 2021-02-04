export class FormValidator {
    constructor(data) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
    }//определяем параметры валидации

    enableValidation () {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
        
            this._setEventListeners(formElement);
        });
    };//проходим по формам для валидации

    _setEventListeners (formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            if (inputElement.value === '' || inputElement.validity.valid) {
                this._hideInputError(formElement, inputElement);
            }
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };//проходим по инпутам формы, проверяем их на валидность до внесения данных и во время внесения

    _checkInputValidity (formElement, inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(formElement, inputElement);
        }
    };//есть ошибки в инпутах или нет


    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
          buttonElement.classList.add(this._inactiveButtonClass);
        } else {
          buttonElement.disabled = false;
          buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };//переключатель для активации кнопки при валидности данных
    
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
    };//возвращаем правда/неправда при валидности инпута в форме
    
    _showInputError (formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };//если данные не валидны - выдаем ошибку
      
    _hideInputError (formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };//если данные валидны - скрываем ошибку
}