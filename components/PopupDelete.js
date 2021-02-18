import { Popup } from './Popup.js';

export class PopupDelete extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
      this._saveButton = this._popup.querySelector('.popup__button');
      this._handleFormSubmit = handleFormSubmit;
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
      this._form.addEventListener('submit', this._formSubmitter);
    }

    _formSubmitter (evt) {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId);
    }

    open(card, cardId) {
      super.open();
      this._element = card._element;
      this._cardId = cardId;
    }

    deleteCard() {
      this._element.remove();
    }
}//класс для форм