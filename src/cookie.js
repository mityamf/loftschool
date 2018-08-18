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

let cookies = parseAllCookies();

addButton.addEventListener('click', () => {
    let cookieName = addNameInput.value, 
        cookieValue = addValueInput.value,
        filterValue = filterNameInput.value;

    if (cookieName) {
        setCookie(cookieName, cookieValue);
    }

    if ( isMatching(cookieName, filterValue) || isMatching(cookieValue, filterValue) ) {
        if (cookies[cookieName] == undefined) {
            createNewLine(listTable, cookieName, cookieValue);
        } else {
            updateValueInTable(cookieName, cookieValue);
        }
    }

    addNameInput.value = '';
    addValueInput.value = '';
    cookies = parseAllCookies();
});

window.addEventListener('load', function() {
    createTable(cookies);
});

function parseAllCookies() {
    const cookiesArray = document.cookie.split('; ');
    const cookies = cookiesArray.reduce((prev, current) => {
        const [name, value] = current.split('=');
        
        prev[name] = value;
        
        return prev;
    }, {});
    
    return cookies;    
}

function createTable(data) {
    const names = Object.keys(data);
    
    listTable.innerHTML = '';

    for (let i = 0; i < names.length; i++) {
        if (names[i]) {
            createNewLine(listTable, names[i], cookies[names[i]]);
        }
    }
    deleteButtonHandler();
}

function deleteButtonHandler() {
    const deleteButtons = document.querySelectorAll('.btn.delete');
    
    deleteButtons.forEach(function(item) {
        item.addEventListener('click', function() {
            const deletingName = item.closest('tr').firstElementChild.textContent;
            
            deleteCookie(deletingName);
            this.closest('tr').remove();
        })
        
    });
}

function createNewLine(target, name, value) {
    target.innerHTML += 
        `<tr>
            <td data-cookie-name="${name}">${name}</td>
            <td>${value}</td>
            <td><div class="btn delete">delete</div></td>
        </tr>`;
}

function updateValueInTable(name, value) {
    const selector = `[data-cookie-name="${name}"]`,
        seekingCell = document.querySelector(selector);

    seekingCell.nextElementSibling.textContent = value;
}

function setCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires == 'number' && expires) {
        let d = new Date();
        
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (let propName in options) {
        updatedCookie += '; ' + propName;
        let propValue = options[propName];
        
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }

    document.cookie = updatedCookie;
}
function deleteCookie(name) {
    setCookie(name, '', {
        expires: -1
    });
    cookies = parseAllCookies();
}

function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) >= 0) {
        return true;
    } else {
        return false;
    }
}

function filterHandler() {
    const names = Object.keys(cookies);
    const filterValue = this.value;
    let filtered = {};

    for (let i = 0; i < names.length; i++) {
        if ( isMatching(names[i], filterValue) || isMatching(cookies[names[i]], filterValue)) {
            filtered[names[i]] = cookies[names[i]];
        }
    }
    createTable(filtered);
}

