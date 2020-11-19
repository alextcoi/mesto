
let editButton = document.querySelector('.edit-button__container');
let closeButton = document.querySelector('.close-button');
let form = document.querySelector('.form');
let name = document.getElementById('name');
let profession = document.getElementById('profession');
let formName = document.getElementById('formName');
let formProfession = document.getElementById('formProfession');

function openForm() {
    formName.setAttribute('value', name.textContent);
    formProfession.setAttribute('value', profession.textContent);
    form.classList.remove('form__opened');
}
function closeForm() {
    form.classList.add('form__opened');
}

editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);


let formContainer = document.querySelector('.form__container');
function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameValue = document.getElementById('formName').value;
    let professionValue = document.getElementById('formProfession').value;
    name.textContent = nameValue;
    profession.textContent = professionValue;
    closeForm();
    formName.setAttribute('value', name.textContent);
    formProfession.setAttribute('value', profession.textContent);
}
formContainer.addEventListener('submit', formSubmitHandler);