import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, imageName, image, closeButton) {
    super(popupSelector);
    this._imageName = this._popup.querySelector(imageName);
    this._image = this._popup.querySelector(image);
    this._closeButton = this._popup.querySelector(closeButton);
  }

  open(name, link) {
    this._imageName.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._closeButton.addEventListener('click', () => super.close());//слушаем клик на кнопку закрытия карточки
  }

}//работа с открытием картинки