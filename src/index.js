import './index.css';
const editButton = document.querySelector('.profile__edit-button');
export const closeButton = document.querySelector('.form__close-button');
const formName = document.querySelector('#form-name');
const formProfession = document.querySelector('#form-profession');
export const cardFormClose = document.querySelector('[name="card_close"]');
const cardFormOpen = document.querySelector('.profile__add-button');
const cardList = document.querySelector('.elements__container');
export const openedCard = document.querySelector('.popup_opened-card');
export const openedCardClose = document.querySelector('.opened-card__close-button');
export const openedCardName = openedCard.querySelector('.opened-card__name');
export const openedCardPic = openedCard.querySelector('.opened-card__pic');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const data = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

import { Card } from '../components/card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

const popupImage = new PopupWithImage('.popup_opened-card', '.opened-card__name', '.opened-card__pic');

const initialCardList = new Section({ items: initialCards, renderer: (item) => {
    const card = new Card({data: item, handleCardClick: () => {
        popupImage.open(item.name, item.link)
    },},'.default-card');
    const cardElement = card.generateCard();
    initialCardList.addItem(cardElement);
}, }, '.elements__container');

initialCardList.renderItems();//рисуем первые карточки с фото

const popupCardForm = new PopupWithForm('.popup_card', {handleFormSubmit: (item) => {
    const card = new Card({data: item, handleCardClick: () => {
        popupImage.open(item.name, item.link)
    },},'.default-card');
    const cardElement = card.generateCard();
    cardList.prepend(cardElement);
    popupCardForm.close();
},});//создание новой карточки при сабмите в форме

popupCardForm.setEventlListeners();//слушаем события на форме с карточками
cardFormOpen.addEventListener('click', () => {popupCardForm.open()});//триггер открытия формы для добавления новой карточки и добавление слушателей на сабмит формы
const currentProfile = new UserInfo({userName: '.profile__title', userTitle: '.profile__subtitle'});//забираем текущее имя и титул

const popupProfileForm = new PopupWithForm('.popup_profile', {handleFormSubmit: (item) => {
    currentProfile.setUserInfo(item);
    popupProfileForm.close();
},});//редактирование профиля при сабмите в форме

popupProfileForm.setEventlListeners();
editButton.addEventListener('click', () => {
    popupProfileForm.open();
    const user = currentProfile.getUserInfo();
    formName.setAttribute('value', user.name);
    formProfession.setAttribute('value', user.profession);
});//триггер на открытие формы для редактирования профиля