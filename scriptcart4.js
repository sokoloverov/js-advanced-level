'use strict';


//Обработчик поля имени
let nameUserSubmit = [];
let nameUser = document.querySelector('#nameUser')
nameUser.addEventListener("keyup", function (event) {
    nameUserSubmit.push(event.key);
    //console.log(nameUserSubmit);
});

//Обработчик поля телефона
let phoneUserSubmit = [];
let phoneUser = document.querySelector('#phoneUser')
phoneUser.addEventListener("keyup", function (event) {
    if (event.key !== "Shift") phoneUserSubmit.push(event.key);
    console.log(phoneUserSubmit);
});

//Обработчик поля почты
let mailUserSubmit = [];
let mailUser = document.querySelector('#mailUser')
mailUser.addEventListener("keyup", function (event) {
    if (event.key !== "Shift") mailUserSubmit.push(event.key);
    console.log(mailUserSubmit);
});


//Проверка заполненных полей формы
//Обработчик кнопки отправки формы
let formName = document.querySelector('#submit')

formName.addEventListener('click', function (event) {
    event.preventDefault();
    formName.classList.add('submitButton');

    //Проверка с регулярными выражениями    
    let checkName = nameUserSubmit.join('');
    let checkNameUserSubmit = /[а-яА-Я]/ugy;

    let checkPhone = phoneUserSubmit.join('');
    let checkPhoneUserSubmit = /\+7\(\d{3}\)\d{3}-\d{4}/;

    let checkMail = mailUserSubmit.join('');
    let checkMailUserSubmit = /\w+[\.\-]?\w+@\w+\.ru/;

    //Проверка каждого поля 
    if (!checkNameUserSubmit.test(checkName)) {
        addColor(nameUser);
    } else {
        removeColor(nameUser);
    }

    if (!checkPhoneUserSubmit.test(checkPhone)) {
        addColor(phoneUser);
    } else {
        removeColor(phoneUser);
    }

    if (!checkMailUserSubmit.test(checkMail)) {
        addColor(mailUser);
    } else {
        removeColor(mailUser);
    }

    //Обнуление массивов и очистка полей ввода
    nameUserSubmit = [];
    nameUser.value = '';
    phoneUserSubmit = [];
    phoneUser.value = '';
    mailUserSubmit = [];
    mailUser.value = '';
});

/**
 * Функция добавления цвета поля неправильно заполненной формы
 */
function addColor(tagForm) {
    tagForm.classList.add('submitButton');
}

/**
 * Функция очистки цвета поля неправильно заполненной формы
 */
function removeColor(tagForm) {
    tagForm.classList.remove('submitButton');
}
