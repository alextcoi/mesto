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
let userId;

const validateParameters = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const popupImage = new PopupWithImage('.popup_opened-card', '.opened-card__name', '.opened-card__pic');//попап с картинкой
popupImage.setEventListeners();//слушаем действия на открытой картинке

const currentProfile = new UserInfo({userName: '.profile__title', userTitle: '.profile__subtitle', userAvatar: '.profile__avatar'});//забираем текущее имя и титул

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-20', 'f0a6b51b-b6dd-4422-9c6f-1c6d9f1c16da');//класс с базовым Api

const popupDeleteForm = new PopupDelete('.popup_delete-card', {
    handleFormSubmit: (cardId) => {
        popupDeleteForm.renderLoading(true);
        api.deletePicture(cardId)
            .then(() => {
                    popupDeleteForm.deleteCard();
                    popupDeleteForm.close();
            })
            .catch((err) => {console.log(err)})
            .finally(() => popupDeleteForm.renderLoading(false))
    },
});//форма для подтверждения удаления карточки
popupDeleteForm.setEventListeners();//слушаем события на форме удаления

api.getProfile()
    .then((result) => {
        currentProfile.setUserInfo(result);
        userId = result._id;
    })
    .catch((err) => {console.log(err)});//запрос информации о пользователе

const initialCardList = new Section({
    renderer: (item) => {
        const card = new Card({data: item, 
            handleCardClick: () => {
                popupImage.open(item.name, item.link);
            },
            handleRemoveClick: () => {
                popupDeleteForm.open(card, item._id);
            },},'.default-card', userId, api);
        const cardElement = card.generateCard();
        initialCardList.addItem(cardElement);
}, }, '.elements__container');//экземпляр секции с карточками

api.getCards()
    .then((result) => {
        const items = result.reverse();
        initialCardList.renderItems(items)})
    .catch((err) => {console.log(err)});//запрос на сервер за карточками и рендеринг

const popupCardForm = new PopupWithForm('.popup_card', {handleFormSubmit: (item) => {
    popupCardForm.renderLoading(true);
    api.postPicture(item)
        .then(item => initialCardList.renderItems([item]))
        .then(() => popupCardForm.close())
        .catch((err) => {console.log(err)})
        .finally(() => popupCardForm.renderLoading(false));
},});//создание новой карточки при сабмите в форме
popupCardForm.setEventListeners();//слушаем события на форме с добавлением карточки

const popupProfileForm = new PopupWithForm('.popup_profile', {handleFormSubmit: (item) => {
    popupProfileForm.renderLoading(true);
    api.patchProfile(item)
        .then((item) => currentProfile.setUserInfo(item))
        .catch((err) => {console.log(err)})
        .finally(() => popupProfileForm.renderLoading(false));
    popupProfileForm.close();
},});//редактирование профиля при сабмите в форме
popupProfileForm.setEventListeners();//слушаем события на форме с данными профиля

const popupPicForm = new PopupWithForm('.popup_profile-picture', {handleFormSubmit: (item) => {
    popupPicForm.renderLoading(true);
    userPic.src = item.avatar;
    api.patchProfilePic(item)
        .catch((err) => console.log(err))
        .finally(() => popupPicForm.renderLoading(false));
    popupPicForm.close();
},})//редактирование картинки профиля при сабмите на форме
popupPicForm.setEventListeners();//слушаем события на форме с аватаром

const cardFormValidator = new FormValidator(validateParameters, '.form_card');
cardFormValidator.enableValidation();
const picFormValidator = new FormValidator(validateParameters, '.form_profile-pic');
picFormValidator.enableValidation();
const profileFormValidator = new FormValidator(validateParameters, '.form_profile');
profileFormValidator.enableValidation();

cardFormOpen.addEventListener('click', () => {popupCardForm.open();});
//триггер открытия формы для добавления новой карточки и добавление слушателей на сабмит формы

editPicButton.addEventListener('click', () => {popupPicForm.open()});
//триггер на открытие формы для редактирования картинки профиля

editButton.addEventListener('click', () => {
    popupProfileForm.open();    
    const user = currentProfile.getUserInfo();
    formName.setAttribute('value', user.name);
    formProfession.setAttribute('value', user.profession);
});//триггер на открытие формы для редактирования профиля

//https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg
//https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg