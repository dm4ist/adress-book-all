'use strict';

let refer = document.referrer;
let dataUserJSONFormat = JSON.stringify(refer, null, 2);
 localStorage.setItem('refer', dataUserJSONFormat);


function getInformationByLocal() {
    const data = localStorage.getItem('dataUser');
    dataUser = JSON.parse(data)
    showDataOnPage(dataUser);
}

function showDataOnPage(dataUser) {
    for (let i = 0; i < dataUser.length; i++) {

        const attributesCellPerson = {
            classes: ['cellPerson']
        };
        const cellPerson = createElement('div', attributesCellPerson, null, null, null);
        const attributes = {
            classes: ['cell']
        };
        createElement('div', attributes, dataUser[i].name, null, cellPerson);
        createElement('div', attributes, dataUser[i].email, null, cellPerson);
        createElement('div', attributes, dataUser[i].telephone, null, cellPerson);

        const attributesBtnPerson = {
            classes: ['btnBlock']
        };

        // Create person button and add in row
        const blockBtnPerson = createElement('div', attributesBtnPerson, null, null, null);

        const handlersView = {
            click: pushViewBtn
        };
        const attributesV = {
            'data-index': i,
            'data-func': 'view',
            'id': 'viewBtn',
            classes: ['viewBtn']
        };
        createElement('div', attributesV, 'View', handlersView, blockBtnPerson);

        const handlersEdit = {
            click: pushEditBtn
        };

        const attributesE = {
            'data-index': i,
            'data-func': 'edit',
            'id': 'editBtn',
            classes: ['editBtn']
        };
        createElement('div', attributesE, 'Edit', handlersEdit, blockBtnPerson);

        const handlersDel = {
            click: pushDelBtn
        };
        const attributesD = {
            'data-index': i,
            'data-func': 'delete',
            'id': 'delBtn',
            classes: ['delBtn']
        };
        createElement('div', attributesD, 'Remove', handlersDel, blockBtnPerson);
        cellPerson.appendChild(blockBtnPerson);

        mainBook.appendChild(cellPerson);
    };
}

function createElement(elementName, attributes, text, handlers, container) {
    const element = document.createElement(elementName);

    for (let key in attributes) {
        if (key === 'classes') {
            for (let i = 0; i < attributes[key].length; i++) {
                element.classList.add(attributes[key][i]);
            }
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }
    element.innerText = text;

    for (let key in handlers) {
        element.addEventListener(key, handlers[key]);
    }

    if (!container) {
        return element;
    } else {
        container.appendChild(element);
    }
}

function pushAddBtn() {
    const titleAdd = document.getElementById('titleAdd');
    titleAdd.innerHTML = 'Add form';
    forBtn.innerHTML = '';
    showFormIfHide();
    const handlers = {
        click: createPerson
    };
    const attributesS = {
        'id': 'save',
        classes: ['baseSave']
    };
    const btnS = createElement('div', attributesS, 'Save', handlers, null);
    forBtn.appendChild(btnS);
    clearDataInput();
    clearDetailedBlock();
}

function pushEditBtn() {
    const idPerson = this.getAttribute('data-index');
    const titleAdd = document.getElementById('titleAdd');
    titleAdd.innerHTML = 'Edit form';
    forBtn.innerHTML = '';
    showFormIfHide();

    const attributesS = {
        'id': 'saveEdit',
        classes: ['baseSave']
    };
    const btnE = createElement('div', attributesS, 'Save edit', null, null);
    btnE.addEventListener('click', function () {
        saveEditPerson(idPerson);
    });
    forBtn.appendChild(btnE);
    const formAdd = document.forms.adressBook.elements;
    formAdd.name.value = dataUser[idPerson].name;
    formAdd.age.value = dataUser[idPerson].age;
    formAdd.email.value = dataUser[idPerson].email;
    formAdd.telNumber.value = dataUser[idPerson].telephone;
    formAdd.cardNumber.value = dataUser[idPerson].creditCard;
}


function pushViewBtn() {
    const idPerson = this.getAttribute('data-index');
    const detailedBlock = document.getElementById('detailedBlock');
    clearDetailedBlock();
    hideFormIfShow();
    const attributesInner = {
        classes: ['innerDetailedBlock']
    };
    const innerDetailedBlock = createElement('div', attributesInner, null, null, null);
    const attributesH = {
        classes: ['titleInfoByPerson']
    };
    const attributes = {
        classes: ['infoByPerson']
    };
    const attributesClose = {
        classes: ['closeBtn']
    };
    const handlersClose = {
        click: clearDetailedBlock
    };

    createElement('h3', attributesH, 'Detailed information', null, innerDetailedBlock);
    createElement('div', attributes, 'Name: ' + dataUser[idPerson].name, null, innerDetailedBlock);
    createElement('div', attributes, 'Age: ' + dataUser[idPerson].age, null, innerDetailedBlock);
    createElement('div', attributes, 'Email: ' + dataUser[idPerson].email, null, innerDetailedBlock);
    createElement('div', attributes, 'Tel. number: ' + dataUser[idPerson].telephone, null, innerDetailedBlock);
    createElement('div', attributes, 'Credit card number: ' + dataUser[idPerson].creditCard, null, innerDetailedBlock);
    createElement('div', attributesClose, 'close', handlersClose, innerDetailedBlock);
    detailedBlock.append(innerDetailedBlock);
}

function pushDelBtn() {
    mainBook.innerHTML += '<div class="parent-modal"><div class="modal"><p>Do you really want to delete this?</p><div id="btnModal"><div id="yes">Yes</div><div id="no">No</div></div></div></div>';
    const deletePerson = document.getElementById('yes');
    const cancelDeletePerson = document.getElementById('no');

    //confirm delete
    deletePerson.addEventListener('click', function () {
        const idPerson = this.getAttribute('data-index');
        dataUser.splice(idPerson, 1);
        let dataUserJSONFormat = JSON.stringify(dataUser, null, 2);
        localStorage.setItem('dataUser', dataUserJSONFormat);
        clearMain();
        clearDetailedBlock();
        hideFormIfShow();
        showDataOnPage(dataUser);
    });

    //cancel delete
    cancelDeletePerson.addEventListener('click', function () {
        clearMain();
        clearDetailedBlock();
        hideFormIfShow();
        showDataOnPage(dataUser);
    });
}

function createPerson() {
    const formAdd = document.forms.adressBook.elements;
    const nameUser = formAdd.name.value;
    const ageUser = formAdd.age.value;
    const emailUser = formAdd.email.value;
    const telNumber = formAdd.telNumber.value;
    const cardNumber = formAdd.cardNumber.value;

    let resultName = inputValidation('checkNameWrong', nameUser, formatName);
    let resultAge = inputValidation('checkNumWrong', ageUser, formatAge);
    let resultEmail = inputValidation('checkEmailWrong', emailUser, formatEmail);
    let resultTel = inputValidation('checkTelWrong', telNumber, formatTel);
    let resultCard = inputValidation('checkCardWrong', cardNumber, formatCard);

    if (resultName && resultAge && resultEmail && resultTel && resultCard) {
        addPerson();
    }

    function addPerson() {
        let userInfo = {
            'name': nameUser,
            'age': ageUser,
            'email': emailUser,
            'telephone': telNumber,
            'creditCard': cardNumber
        };

        dataUser.push(userInfo);
        let dataUserJSONFormat = JSON.stringify(dataUser, null, 2);
        localStorage.setItem('dataUser', dataUserJSONFormat);
        clearDataInput();
        clearMain();
        clearDetailedBlock();
        hideFormIfShow();
        showDataOnPage(dataUser);
    }
}

function saveEditPerson(idPerson) {
    const formAdd = document.forms.adressBook.elements;
    const nameUser = formAdd.name.value;
    const ageUser = formAdd.age.value;
    const emailUser = formAdd.email.value;
    const telNumber = formAdd.telNumber.value;
    const cardNumber = formAdd.cardNumber.value;

    let resultName = inputValidation('checkNameWrong', nameUser, formatName);
    let resultAge = inputValidation('checkNumWrong', ageUser, formatAge);
    let resultEmail = inputValidation('checkEmailWrong', emailUser, formatEmail);
    let resultTel = inputValidation('checkTelWrong', telNumber, formatTel);
    let resultCard = inputValidation('checkCardWrong', cardNumber, formatCard);

    if (resultName && resultAge && resultEmail && resultTel && resultCard) {
        updateData();
    }

    function updateData() {
        dataUser[idPerson].name = nameUser;
        dataUser[idPerson].age = ageUser;
        dataUser[idPerson].email = emailUser;
        dataUser[idPerson].telephone = telNumber;
        dataUser[idPerson].creditCard = cardNumber;

        let dataUserJSONFormat = JSON.stringify(dataUser, null, 2);
        localStorage.setItem('dataUser', dataUserJSONFormat);
        clearDataInput();
        clearMain();
        clearDetailedBlock();
        hideFormIfShow();
        showDataOnPage(dataUser);
    }
}

function inputValidation(idOutput, inputValue, checkCondition) {
    const blockOutput = document.getElementById(idOutput);
    let checkValue = inputValue.match(checkCondition);
    blockOutput.innerHTML = '';
    if (checkValue !== null) {
        blockOutput.innerHTML = '';
        return checkValue;
    } else {
        blockOutput.innerHTML = '<span class="wrong">Wrong!</span>';
        return checkValue;
    }
}

function clearDataInput() {
    const formAdd = document.forms.adressBook.elements;
    formAdd.name.value = '';
    formAdd.age.value = '';
    formAdd.email.value = '';
    formAdd.telNumber.value = '';
    formAdd.cardNumber.value = '';
}

function clearMain() {
    mainBook.innerHTML = '';
}

function clearDetailedBlock() {
    detailedBlock.innerHTML = '';
}

function showFormIfHide() {
    let formForAddPerson = document.getElementById("formReg");
    let tumb = formForAddPerson.classList.contains("hideForm");
    if (tumb) { formForAddPerson.classList.toggle("hideForm"); }
}

function hideFormIfShow() {
    let formForAddPerson = document.getElementById("formReg");
    let tumb = formForAddPerson.classList.contains("hideForm");
    if (!tumb) { formForAddPerson.classList.toggle("hideForm"); }
}

