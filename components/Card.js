export class Card {
    constructor({data, handleCardClick}, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }//определяем параметры карточки

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__pic').src = this._link;
        this._element.querySelector('.element__pic').alt = this._name;
        this._element.querySelector('.element__text').textContent = this._name;
    
        return this._element;
    }//создаем карточку

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
        return cardElement;
    }//забираем шаблон из разметки

    _setEventListeners() {
        this._element.querySelector('.element__button').addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__button_clicked');
        });
        this._element.querySelector('.element__delete').addEventListener('click', function (evt) {
            evt.target.closest('.element').remove();
        });
        this._element.querySelector('.element__pic').addEventListener('click', () => this._handleCardClick());
    }//навешиваем основные обработчики на карточку - лайк, удаление, открытие картинки
}