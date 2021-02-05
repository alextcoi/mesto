export class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._clickOutside = this._clickOutside.bind(this);
      this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);//слушаем нажатие esc на открытых попапах
    }//открытие попапов

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);//убираем слушатели
    }//закрытие попапов

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }//закрытие попапа при нажатии esc

    _clickOutside(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        };
    }//закрытие попапа при клике на оверлей

    setEventListeners() {
        document.addEventListener('click', this._clickOutside);//слушаем клик на оверлэй
    }
}//родительский класс для работы с попапами