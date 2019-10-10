'use strict';

let dataUser = [];
const mainBook = document.getElementById('mainBook');

if (localStorage.getItem('dataUser') !== null) {
    getInformationByLocal();
};

const addPerson = document.getElementById('addUser');
addPerson.addEventListener('click', pushAddBtn);
