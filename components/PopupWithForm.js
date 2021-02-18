import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._handleFormSubmit = handleFormSubmit;
      this._saveButton = this._popup.querySelector('.popup__button');
      this.close = this.close.bind(this);
      this._formSubmitter = this._formSubmitter.bind(this);
    }

    renderLoading(isLoading) {
      if (isLoading) {
        this._saveButton.textContent = 'Сохранение...';
      } else {
        this._saveButton.textContent = 'Сохранить';
      }
    }//анимация при загрузке страницы

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
      this._form.addEventListener('submit', this._formSubmitter);
    }

    _formSubmitter (evt) {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    }

    close() {
      this._form.reset();
      super.close();
    }
}//класс для форм