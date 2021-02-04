import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, closeButton, {handleFormSubmit}) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._handleFormSubmit = handleFormSubmit;
      this._closeButton = this._form.querySelector(closeButton);
      this.close = this.close.bind(this);
      this._formSubmitter = this._formSubmitter.bind(this);
    }

    _getInputValues() {
      this._inputList = this._form.querySelectorAll('.popup__input');
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }

    setEventListeners() {
      super.setEventListeners();
      this._closeButton.addEventListener('click', this.close);//слушаем клик на кнопку закрытия
      this._form.addEventListener('submit', this._formSubmitter);
    }

    _formSubmitter (evt) {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    }

    open() {
      super.open();
    }

    close() {
      this._closeButton.removeEventListener('click', this.close);//слушаем клик на кнопку закрытия
      this._form.removeEventListener('submit', this._formSubmitter);
      this._form.reset();
      super.close();
    }
}//класс для форм