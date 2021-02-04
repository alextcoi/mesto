export class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
    }//открытие попапов

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', () => this._handleEscClose());//убираем слушатели
        document.removeEventListener('click', () => this._clickOutside());//убираем слушатели
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

    setEventlListeners() {
        document.addEventListener('keyup', (evt) => this._handleEscClose(evt));//слушаем нажатие esc на открытых попапах
        document.addEventListener('click', (evt) => this._clickOutside(evt));//слушаем клик на оверлэй
    }
}//родительский класс для работы с попапами