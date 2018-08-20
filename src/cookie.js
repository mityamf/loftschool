/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', filterHandler);

window.addEventListener('load', () => {
    let cookiesObj = parseAllCookies();
    createTable(cookiesObj);
});

function parseAllCookies() {
    const cookiesArray = document.cookie.split('; ');
    return cookiesArray.reduce((prev, current) => {
        const [name, value] = current.split('=');
        
        prev[name] = value;
        
        return prev;
    }, {});   
}

function createTable(data) {
    if (!data) return;
    const names = Object.keys(data);
    
    listTable.innerHTML = '';

    for (let i = 0; i < names.length; i++) {
        if (names[i]) {
            createNewLine(names[i], data[names[i]]);
        }
    }
}

function createNewLine(name, value) {
    listTable.innerHTML += 
        `<tr>
            <td data-cookie-name="${name}">${name}</td>
            <td>${value}</td>
            <td><button class="btn delete">delete</button></td>
        </tr>`;
}


listTable.addEventListener('click', deleteHandler);

function deleteHandler(e) {
    if (e.target.classList.contains('delete')) { 
        const deletingName = e.target.closest('tr').firstElementChild.textContent; 
        deleteCookie(deletingName);
        e.target.closest('tr').remove();
    }
}

function deleteCookie(name) {
    const date = new Date(0);
    document.cookie = `${name}=; expires=${date.toUTCString()}`;
}

addButton.addEventListener('click', addCookieHandler);




function addCookieHandler() {
    let cookieName = addNameInput.value, 
        cookieValue = addValueInput.value,
        filterValue = filterNameInput.value;

    document.cookie = `${cookieName}=${cookieValue}`;
    filterHandler();
}


function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) >= 0) {
        return true;
    } else {
        return false;
    }
}

function filterHandler() {
    const cookies = parseAllCookies();
    const names = Object.keys(cookies);
    const filterValue = filterNameInput.value;
    let filtered = {};

    for (let i = 0; i < names.length; i++) {
        if ( isMatching(names[i], filterValue) || isMatching(cookies[names[i]], filterValue)) {
            filtered[names[i]] = cookies[names[i]];
        }
    }
    createTable(filtered);
}

