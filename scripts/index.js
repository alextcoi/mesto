const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.form__close-button');
const form = document.querySelector('.form');
const name = document.getElementById('name');
const profession = document.getElementById('profession');
const formName = document.getElementById('form-name');
const formProfession = document.getElementById('form-profession');
const formContainer = document.querySelector('.form__container');
const cardForm = document.querySelector('.form_card');
const cardFormClose = document.querySelector('[name="card_close"]');
const cardFormOpen = document.querySelector('.profile__add-button');
const cardFormContainer = document.querySelector('[name="card_form"]');
const cardList = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('#card_template');
const inputCardName = document.querySelector('[name="card_name"]');
const inputCardLink = document.querySelector('[name="card_link"]');
const saveNewCardButton = document.querySelector('[name="card_save"]');
const openedCard = document.querySelector('.opened-card');
const openedCardClose = document.querySelector('.opened-card__close-button');
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
        const targetCard = evt.target.closest('.element');
        targetCard.remove();
    });
    cardLink.addEventListener('click', function (evt) {
        const targetCard = evt.target.closest('.element');
        const openedPicName = targetCard.querySelector('.element__text').textContent;
        const openedPicLink = targetCard.querySelector('.element__pic').src;
        openCardPicture({ name: openedPicName, link: openedPicLink });
    });
    return newCard;
}//формирование карточки + работа лайка + удаление карточки + открытие вложенной картинки


function openCardPicture ({ name, link }) {
    const openedCardName = openedCard.querySelector('.opened-card__name');
    const openedCardPic = openedCard.querySelector('.opened-card__pic');
    openedCardName.textContent = name;
    openedCardPic.src = link;
    openedCardPic.alt = name;
    openedCard.classList.add('opened-card_opened');
}//открытие картинки


openedCardClose.addEventListener('click', function(evt) {
    const targetPicture = evt.target.closest('.opened-card');
    targetPicture.classList.remove('opened-card_opened');  
});//закрытие картинки


function addNewCard (evt){
    evt.preventDefault();
    const inputName = inputCardName.value;
    const inputLink = inputCardLink.value;
    const newCard = composeCard({ name: inputName, link: inputLink })
    cardList.prepend(newCard);
    closeCardForm();
}//создание новой карточки

saveNewCardButton.addEventListener('click', addNewCard);//триггер для сохранения новой карточки


function openCardForm () {
    cardForm.classList.add('form_opened');
}//открытие попапа для карточки
cardFormOpen.addEventListener('click', openCardForm);//триггер открытия попапа для карточки


function closeCardForm() {
    cardForm.classList.remove('form_opened');
    cardFormContainer.reset();
}//закрытие попапа для карточки
cardFormClose.addEventListener('click', closeCardForm);//триггер закрытия попапа для карточки


function openForm() {
    formName.setAttribute('value', name.textContent);
    formProfession.setAttribute('value', profession.textContent);
    form.classList.add('form_opened');
}//открытие попапа для профиля
editButton.addEventListener('click', openForm);//триггер открытия попапа для профиля


function closeForm() {
    form.classList.remove('form_opened');
    formContainer.reset();
}//закрытие попапа для профиля
closeButton.addEventListener('click', closeForm);//триггер закрытия попапа для профиля


function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameValue = document.getElementById('form-name').value;
    let professionValue = document.getElementById('form-profession').value;
    name.textContent = nameValue;
    profession.textContent = professionValue;
    closeForm();
    formName.setAttribute('value', name.textContent);
    formProfession.setAttribute('value', profession.textContent);
}//сохранение имени и профессии из попапа профиля
formContainer.addEventListener('submit', formSubmitHandler);//триггер сохранения имени и профессии из попапа профиля