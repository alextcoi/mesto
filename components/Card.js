export class Card {
    constructor({data, handleCardClick, handleRemoveClick}, cardSelector, myId, api) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._owner = data.owner;
        this._id = data._id;
        this._myId = myId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleRemoveClick = handleRemoveClick;
        this.api = api;
    }//определяем параметры карточки

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__pic').src = this._link;
        this._element.querySelector('.element__pic').alt = this._name;
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__button-counter').textContent = this._likes.length;
        if (this._likes.some(item => item._id === this._myId)) {
            this._element.querySelector('.element__button').classList.add('element__button_clicked');
        };
        
        if (this._owner._id !== this._myId) {
            this._element.querySelector('.element__delete').remove();
        }
    
        return this._element;
    }//создаем карточку

    _toggleLike(evt, cardId) {
        if (this._checkLikes()) {
            this.api.deleteLike(cardId)
                .then((res) => {
                    this._likes = res.likes;
                    this._element.querySelector('.element__button-counter').textContent = res.likes.length;
                    evt.target.classList.remove('element__button_clicked');
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            this.api.putLike(cardId)
                .then((res) => {
                    this._likes = res.likes;
                    this._element.querySelector('.element__button-counter').textContent = res.likes.length;
                    evt.target.classList.add('element__button_clicked');
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    _checkLikes() {
        return this._likes.some((item) => {
            return item._id === this._myId
        })
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
        return cardElement;
    }//забираем шаблон из разметки

    _setEventListeners() {
        this._element.querySelector('.element__button').addEventListener('click', (evt) => this._toggleLike(evt, this._id));
        this._element.querySelector('.element__delete').addEventListener('click', () => this._handleRemoveClick());
        this._element.querySelector('.element__pic').addEventListener('click', () => this._handleCardClick());
    }//навешиваем основные обработчики на карточку - лайк, удаление, открытие картинки

    //owner id: 9c92af7ac65547ea8ea5aad4
}