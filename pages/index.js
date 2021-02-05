import './index.css';
import { Card } from '../components/card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const formName = document.querySelector('#form-name');
const formProfession = document.querySelector('#form-profession');
const cardFormOpen = document.querySelector('.profile__add-button');

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

const dataCard = {
    formSelector: '.form_card',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const dataProfile = {
    formSelector: '.form_profile',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const profileFormValidator = new FormValidator(dataProfile);
profileFormValidator.enableValidation();// включаем валидацию для профиля
const cardFormValidator = new FormValidator(dataCard);
cardFormValidator.enableValidation();// включаем валидацию для карточек
const popupImage = new PopupWithImage('.popup_opened-card', '.opened-card__name', '.opened-card__pic', '.opened-card__close-button');
popupImage.setEventListeners();

const initialCardList = new Section({ items: initialCards, renderer: (item) => {
    const card = new Card({data: item, handleCardClick: () => {
        popupImage.open(item.name, item.link);
    },},'.default-card');
    const cardElement = card.generateCard();
    initialCardList.addItem(cardElement);
}, }, '.elements__container');

initialCardList.renderItems();//рисуем первые карточки с фото

const popupCardForm = new PopupWithForm('.popup_card', '.form__close-button_card', {handleFormSubmit: (item) => {
    const card = new Card({data: item, handleCardClick: () => {
        popupImage.open(item.name, item.link)
    },},'.default-card');
    const cardElement = card.generateCard();
    initialCardList.preaddItem(cardElement);
    popupCardForm.close();
},});//создание новой карточки при сабмите в форме

cardFormOpen.addEventListener('click', () => {
    popupCardForm.open();
    popupCardForm.setEventListeners();//слушаем события на форме с карточками
});//триггер открытия формы для добавления новой карточки и добавление слушателей на сабмит формы
const currentProfile = new UserInfo({userName: '.profile__title', userTitle: '.profile__subtitle'});//забираем текущее имя и титул

const popupProfileForm = new PopupWithForm('.popup_profile', '.form__close-button', {handleFormSubmit: (item) => {
    currentProfile.setUserInfo(item);
    popupProfileForm.close();
},});//редактирование профиля при сабмите в форме

editButton.addEventListener('click', () => {
    popupProfileForm.open();
    popupProfileForm.setEventListeners();
    const user = currentProfile.getUserInfo();
    formName.setAttribute('value', user.name);
    formProfession.setAttribute('value', user.profession);
});//триггер на открытие формы для редактирования профиля