import { Card } from './Card.js';

export class CardFormServer extends Card {
    constructor({data, handleCardClick, handleRemoveClick}, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleRemoveClick = handleRemoveClick;
    }

    generateCard() {
        super.generateCard();
        this._element.querySelector('.element__button-counter').textContent = data.likes.length;
    }

    _getTemplate() {
        super._getTemplate();
    }

    _setEventListeners() {
        super._setEventListeners();
    }
}