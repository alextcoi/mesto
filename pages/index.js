import './index.css';
import { Card } from '../components/card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupDelete } from '../components/PopupDelete';
import { Api } from '../components/Api.js';

const editButton = document.querySelector('.profile__edit-button');
const formName = document.querySelector('#form-name');
const formProfession = document.querySelector('#form-profession');
const cardFormOpen = document.querySelector('.profile__add-button');
const editPicButton = document.querySelector('.profile__avatar-container');
export const userPic = document.querySelector('.profile__avatar');
export const userName = document.querySelector('.profile__title');
export const userAbout = document.querySelector('.profile__subtitle');
const cardContainer = document.querySelector('.elements__container');

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

const dataPic = {
    formSelector: '.form_profile-pic',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const profileFormValidator = new FormValidator(dataProfile);
const cardFormValidator = new FormValidator(dataCard);
const profilePicFormValidator = new FormValidator(dataPic);
const popupImage = new PopupWithImage('.popup_opened-card', '.opened-card__name', '.opened-card__pic', '.opened-card__close-button');
popupImage.setEventListeners();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-20', 'f0a6b51b-b6dd-4422-9c6f-1c6d9f1c16da');

api.getProfile().then((result) => {
    userPic.src = result.avatar;
    userPic.alt = result.name;
    userName.textContent = result.name;
    userAbout.textContent = result.about;
});

api.getCards().then((result) => {
    const initialCardList = new Section({
        items: result,
        renderer: (item) => {
            const card = new Card({data: item, 
                handleCardClick: () => {
                    popupImage.open(item.name, item.link);
                },
                handleRemoveClick: () => {
                    const popupDeleteForm = new PopupDelete('.popup_delete-card', '.form__close-button_delete-card', {
                        handleFormSubmit: () => {
                            popupDeleteForm.renderLoading(true);
                            api.deletePicture(item._id)
                                .then(() => {
                                    popupDeleteForm.deleteCard();
                                    popupDeleteForm.close();
                                })
                                .finally(() => popupDeleteForm.renderLoading(false))
                        },});//форма для подтверждения удаления карточки
                    popupDeleteForm.open(card);
                    popupDeleteForm.setEventListeners();
                },},'.default-card', '9c92af7ac65547ea8ea5aad4', api);
            const cardElement = card.generateCard();
            initialCardList.addItem(cardElement);
    }, }, '.elements__container');
    
    initialCardList.renderItems();//рисуем первые карточки с фото
});//отрисовка карточек

const popupCardForm = new PopupWithForm('.popup_card', '.form__close-button_card', {handleFormSubmit: (item) => {
    popupCardForm.renderLoading(true);
    api.postPicture(item).then((res) => {
        const card = new Card({
            data: res, 
            handleCardClick: () => {
                popupImage.open(res.name, res.link)
            },
            handleRemoveClick: () => {
                const popupDeleteForm = new PopupDelete('.popup_delete-card', '.form__close-button_delete-card', {
                    handleFormSubmit: () => {
                        popupDeleteForm.renderLoading(true);
                        api.deletePicture(res._id)
                            .then(() => {
                                    popupDeleteForm.deleteCard();
                                    popupDeleteForm.close();
                            })
                            .finally(() => popupDeleteForm.renderLoading(false))
                    },});//форма для подтверждения удаления карточки
                popupDeleteForm.open(card);
                popupDeleteForm.setEventListeners();
        },},'.default-card', '9c92af7ac65547ea8ea5aad4', api);
        const cardElement = card.generateCard();
        cardContainer.prepend(cardElement);
        popupCardForm.close();
    })
    .finally(() => popupCardForm.renderLoading(false));
},});//создание новой карточки при сабмите в форме

const currentProfile = new UserInfo({userName: '.profile__title', userTitle: '.profile__subtitle'});//забираем текущее имя и титул
const popupProfileForm = new PopupWithForm('.popup_profile', '.form__close-button', {handleFormSubmit: (item) => {
    popupProfileForm.renderLoading(true);
    currentProfile.setUserInfo(item);
    api.patchProfile(item).finally(() => popupProfileForm.renderLoading(false));
    popupProfileForm.close();
},});//редактирование профиля при сабмите в форме

const popupPicForm = new PopupWithForm('.popup_profile-picture', '.form__close-button_profile-pic', {handleFormSubmit: (item) => {
    userPic.src = item.pic_link;
    popupPicForm.renderLoading(true);
    api.patchProfilePic(item).finally(() => popupPicForm.renderLoading(false));
    popupPicForm.close();
},})//редактирование картинки профиля при сабмите на форме

cardFormOpen.addEventListener('click', () => {
    popupCardForm.open();
    popupCardForm.setEventListeners();//
    cardFormValidator.enableValidation();//
});//триггер открытия формы для добавления новой карточки и добавление слушателей на сабмит формы

editPicButton.addEventListener('click', () => {
    popupPicForm.open();
    popupPicForm.setEventListeners();
    profilePicFormValidator.enableValidation();//включаем валидацию для картинки профиля
});//триггер на открытие формы для редактирования картинки профиля

editButton.addEventListener('click', () => {
    popupProfileForm.open();
    popupProfileForm.setEventListeners();
    profileFormValidator.enableValidation();//
    const user = currentProfile.getUserInfo();
    formName.setAttribute('value', user.name);
    formProfession.setAttribute('value', user.profession);
});//триггер на открытие формы для редактирования профиля

//https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg
//https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg