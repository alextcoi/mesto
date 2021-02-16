import { Popup } from './Popup.js';

export class PopupDelete extends Popup {
    constructor(popupSelector, closeButton, {handleFormSubmit}) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._saveButton = this._popup.querySelector('.popup__button');
      this._handleFormSubmit = handleFormSubmit;
      this._closeButton = this._form.querySelector(closeButton);
      this.close = this.close.bind(this);
      this._formSubmitter = this._formSubmitter.bind(this);
    }

    renderLoading(isLoading) {
      if (isLoading) {
        this._saveButton.textContent = 'Удаление...';
      } else {
        this._saveButton.textContent = 'Удалить';
      }
    }//анимация при загрузке страницы

    setEventListeners() {
      super.setEventListeners();
      this._closeButton.addEventListener('click', this.close);//слушаем клик на кнопку закрытия
      this._form.addEventListener('submit', this._formSubmitter);
    }

    _formSubmitter (evt) {
      evt.preventDefault();
      this._handleFormSubmit();
    }

    open(card) {
      super.open();
      this._element = card._element;
    }

    deleteCard() {
      this._element.remove();
    }

    close() {
      this._closeButton.removeEventListener('click', this.close);//слушаем клик на кнопку закрытия
      this._form.removeEventListener('submit', this._formSubmitter);
      this._form.reset();
      super.close();
    }
}//класс для форм