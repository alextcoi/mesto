import { FormValidator } from './FormValidator.js';
import { data, closeButton, cardFormClose } from '../src/index.js';
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
      super(popupSelector);
      this._popup = document.querySelector(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
      this._inputList = this._form.querySelectorAll('.popup__input');
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }

    setEventlListeners() {
      super.setEventlListeners();
      cardFormClose.addEventListener('click', () => this.close());//слушаем клик на кнопку закрытия
      closeButton.addEventListener('click', () => this.close());//слушаем клик на кнопку закрытия
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      })
    }

    open() {
      super.open();
      const formValidator = new FormValidator(data);
      formValidator.enableValidation();// включаем валидацию;
    }

    close() {
      cardFormClose.removeEventListener('click', () => this.close());//слушаем клик на кнопку закрытия
      closeButton.removeEventListener('click', () => this.close());//слушаем клик на кнопку закрытия
      this._form.removeEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      })
      this._form.reset();
      super.close();
    }
}//класс для форм