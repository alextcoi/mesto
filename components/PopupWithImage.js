import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, imageName, image) {
    super(popupSelector);
    this._imageName = this._popup.querySelector(imageName);
    this._image = this._popup.querySelector(image);
  }

  open(name, link) {
    this._imageName.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}//работа с открытием картинки