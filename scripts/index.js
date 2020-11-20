
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.form__close-button');
let form = document.querySelector('.form');
let name = document.getElementById('name');
let profession = document.getElementById('profession');
let formName = document.getElementById('form-name');
let formProfession = document.getElementById('form-profession');
let formContainer = document.querySelector('.form__container');

function openForm() {
    formName.setAttribute('value', name.textContent);
    formProfession.setAttribute('value', profession.textContent);
    form.classList.add('form_opened');
}
function closeForm() {
    form.classList.remove('form_opened');
    formContainer.reset();
}

editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);


function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameValue = document.getElementById('form-name').value;
    let professionValue = document.getElementById('form-profession').value;
    name.textContent = nameValue;
    profession.textContent = professionValue;
    closeForm();
    formName.setAttribute('value', name.textContent);
    formProfession.setAttribute('value', profession.textContent);
}
formContainer.addEventListener('submit', formSubmitHandler);