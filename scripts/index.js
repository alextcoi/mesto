const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.form__close-button');
const form = document.querySelector('.popup_profile');
const profileName = document.querySelector('#name');
const profession = document.querySelector('#profession');
const formName = document.querySelector('#form-name');
const formProfession = document.querySelector('#form-profession');
const formContainer = document.querySelector('.form');
const cardForm = document.querySelector('.popup_card');
const cardFormClose = document.querySelector('[name="card_close"]');
const cardFormOpen = document.querySelector('.profile__add-button');
const cardFormContainer = document.querySelector('[name="card_form"]');
const cardList = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('#card_template');
const inputCardName = document.querySelector('[name="card_name"]');
const inputCardLink = document.querySelector('[name="card_link"]');
const saveNewCardButton = document.querySelector('[name="card_save"]');
const openedCard = document.querySelector('.popup_opened-card');
const openedCardClose = document.querySelector('.opened-card__close-button');
const openedCardName = openedCard.querySelector('.opened-card__name');
const openedCardPic = openedCard.querySelector('.opened-card__pic');

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

function createFirstCards() {
    const listCards = initialCards.map(composeCard);
    cardList.append(...listCards);
}
createFirstCards();//формирование первоначальных картинок

function composeCard({ name, link }){
    const newCard = cardTemplate.content.cloneNode(true);
    const cardName = newCard.querySelector('.element__text');
    const cardLink = newCard.querySelector('.element__pic');
    cardName.textContent = name;
    cardLink.src = link;
    cardLink.alt = name;
    newCard.querySelector('.element__button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__button_clicked');
    });
    newCard.querySelector('.element__delete').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    cardLink.addEventListener('click', () => openCardPicture({name, link}));
    return newCard;
}//формирование карточки + работа лайка + удаление карточки + открытие вложенной картинки

function openCardPicture ({ name, link }) {  
    openedCardName.textContent = name;
    openedCardPic.src = link;
    openedCardPic.alt = name;
    openPopup(openedCard);
}//открытие картинки

openedCardClose.addEventListener('click', function(evt) {
    const targetPicture = evt.target.closest('.popup');
    closePopup(targetPicture);  
});//закрытие картинки

function openPopup(popup) {
    popup.classList.add('popup_opened');
    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });//вызов валидации
    document.addEventListener('keyup', escapePopup);//слушаем нажатие esc на открытых попапах
    document.addEventListener('click', clickOutside);//слушаем клик на оверлэй
} //открытие попапов

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', escapePopup);
    document.removeEventListener('click', clickOutside);
} //закрытие попапов

function addNewCard (evt){
    evt.preventDefault();
    const inputName = inputCardName.value;
    const inputLink = inputCardLink.value;
    const newCard = composeCard({ name: inputName, link: inputLink })
    cardList.prepend(newCard);
    closePopup(cardForm);
    cardFormContainer.reset();
}//создание новой карточки

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profession.textContent = formProfession.value;
    closePopup(form);
}//сохранение имени и профессии из попапа профиля

function checkClass(popup) {
    return popup.classList.contains('popup_opened');
}//проверка, что попап открыт

function escapePopup(evt) {
    const popupActive = document.querySelector('.popup_opened');
    if (evt.key === "Escape") {
        closePopup(popupActive);
    }
}//закрытие попапа при нажатии esc

function clickOutside(evt) {
    if (checkClass(evt.target)) {
        closePopup(evt.target);
    };
};//закрытие попапа при клике на оверлей

cardFormContainer.addEventListener('submit', addNewCard);//триггер для сохранения новой карточки
cardFormOpen.addEventListener('click', ()=>openPopup(cardForm));//триггер открытия попапа для карточки
cardFormClose.addEventListener('click', ()=>closePopup(cardForm));//триггер закрытия попапа для карточки

editButton.addEventListener('click', () => {
    formContainer.reset();//сбрасываю из инпутов введенные, но не сохраненные данные пользователя
    formName.setAttribute('value', profileName.textContent);
    formProfession.setAttribute('value', profession.textContent);
    openPopup(form)
});//триггер открытия попапа для профиля

closeButton.addEventListener('click', ()=>closePopup(form));//триггер закрытия попапа для профиля
formContainer.addEventListener('submit', formSubmitHandler);//триггер сохранения имени и профессии из попапа профиля