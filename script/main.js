function openNav() {
    document.getElementById('mySidenav').style.width = '300px';
}

function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
}

let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна

openPopupButtons.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popupBg.classList.add('active'); // Добавляем класс 'active' для фона
        popup.classList.add('active'); // И для самого окна
    })
});
closePopupButton.addEventListener('click', () => { // Вешаем обработчик на крестик
    popupBg.classList.remove('active'); // Убираем активный класс с фона
    popup.classList.remove('active'); // И с окна
}); document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if (e.target === popupBg) { // Если цель клика - фот, то:
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active'); // И с окна
    }
});

// Функция для открытия попапа
function openPopup(popupId) {
    document.getElementById(popupId).style.display = "block";
}

// Функция для закрытия попапа
function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

// Функция для открытия попапа
function openPopup(popupId) {
    document.getElementById(popupId).style.display = "block";

    // Добавляем обработчик события клика на прозрачный фон попапа
    document.getElementById(popupId).addEventListener("click", function (event) {
        if (event.target === this) { // Если клик произошел по прозрачному фону
            closePopup(popupId); // Закрываем попап
        }
    });
}

// Функция для закрытия попапа
function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";

    // Останавливаем видео при закрытии попапа
    let iframe = document.getElementById(popupId).querySelector("iframe");
    if (iframe) {
        let iframeSrc = iframe.src;
        iframe.src = iframeSrc; // Обновляем источник iframe, чтобы остановить воспроизведение видео
    }
}

// Получаем все элементы с классом "photo" и добавляем обработчик события для каждого из них
let photos = document.getElementsByClassName("photo");
for (let i = 0; i < photos.length; i++) {
    photos[i].addEventListener("click", (function (index) {
        return function () {
            let popupId = "popup" + (index + 1);
            openPopup(popupId);
        };
    })(i));
}













$(document).ready(function () {
    // Функция для заполнения данных стран в выпадающем списке
    function populateCountries(countryDropdown, phoneNumberField) {
        $.ajax({
            url: 'https://restcountries.com/v3.1/all',
            method: 'GET',
            success: function (data) {
                data.forEach(function (country) {
                    countryDropdown.append($('<option>', {
                        value: '+' + country.ccn3,
                        text: country.name.common
                    }));
                });
            },
            error: function () {
                console.log('Не удалось загрузить данные стран.');
            }
        });

        // Обработчик изменения выбранной страны
        countryDropdown.change(function () {
            let countryCode = $(this).val();
            phoneNumberField.val(countryCode); // Заменяем текущий номер новым номером с кодом выбранной страны
        });
    }

    // Вызов функции для каждой пары выпадающего списка и поля ввода на странице
    populateCountries($('#country1'), $('#phone_number1'));
    populateCountries($('#country2'), $('#phone_number2'));





    
// Обработка события отправки формы
$('form').submit(function (event) {
    // Проверка каждого поля на заполненность
    let isValid = true;
    $(this).find('input[type="text"], input[type="email"], input[type="tel"], select').each(function () {
        if (!$(this).val()) {
            isValid = false;
            $(this).addClass('invalid'); // Добавляем класс invalid для незаполненных полей
        } else {
            $(this).removeClass('invalid'); // Убираем класс invalid для заполненных полей
        }
    });

    // Проверка поля номера телефона на заполненность и правильность заполнения
    let phoneNumber1 = $('#phone_number1').val();
    let phoneNumber2 = $('#phone_number2').val();
    let countryCode1 = $('#country1').val(); // Получаем значение (код) выбранной страны
    let countryCode2 = $('#country2').val(); // Получаем значение (код) выбранной страны

    // Проверяем, что поле ввода номера телефона не пустое и начинается с кода страны
    if (phoneNumber1 && !phoneNumber1.startsWith(countryCode1)) {
        $('#phone_number1').addClass('invalid');
        isValid = false;
    } else {
        $('#phone_number1').removeClass('invalid');
    }

    if (phoneNumber2 && !phoneNumber2.startsWith(countryCode2)) {
        $('#phone_number2').addClass('invalid');
        isValid = false;
    } else {
        $('#phone_number2').removeClass('invalid');
    }

    // Проверка чекбокса на отмеченность
    if (!$('input[type="checkbox"]').is(':checked')) {
        isValid = false;
        $('label.checkbox-container').addClass('invalid');
    } else {
        $('label.checkbox-container').removeClass('invalid');
    }

    // Если форма прошла проверку, выводим алерт и разрешаем отправку формы
    if (isValid) {
        alert('Форма отправлена');
    } else {
        // Если есть хотя бы одно незаполненное поле или неверно заполненное поле, предотвращаем отправку формы
        event.preventDefault();
    }
});

// Убираем класс invalid при фокусировке на незаполненном поле
$('form input, form select').focus(function () {
    $(this).removeClass('invalid');
});

// Проверка поля номера телефона при вводе
$('#phone_number1, #phone_number2').on('input', function () {
    let phoneNumber = $(this).val();
    let countryCode = $(this).closest('.input-group').find('select').val();
    if (phoneNumber && !phoneNumber.startsWith(countryCode)) {
        $(this).addClass('invalid');
    } else {
        $(this).removeClass('invalid');
    }
});

});
















// Функция для открытия и закрытия попапа
function togglePopup(popupId) {
    let popup = document.getElementById(popupId);
    if (popup.style.display === "block") {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
        // Добавляем обработчик события клика на прозрачный фон попапа
        popup.addEventListener("click", function (event) {
            if (event.target === this) { // Если клик произошел по прозрачному фону
                togglePopup(popupId); // Закрываем попап
            }
        });
    }
}

// Функция для инициализации карусели
function initCarousel(wrapper) {
    const carousel = wrapper.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = wrapper.querySelectorAll("i");

    let isDragging = false, startX, startScrollLeft;

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
}

// Инициализация каруселей
const wrappers = document.querySelectorAll(".wrapper");
wrappers.forEach(initCarousel);


// Функция при скролле <header> менялся с <relative> на <fixed>
window.addEventListener('scroll', function () {
    let header = document.querySelector('.header');
    let contentScroll = document.querySelector('.content1');
    let headerHeight = header.offsetHeight;
    let contentScrollHeight = contentScroll.offsetHeight;
    let scrollTop = window.scrollY || window.pageYOffset;

    if (scrollTop >= contentScrollHeight - headerHeight) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});

// Нажатие на логотип переносит в верх страницы
document.getElementById('reloadImage').addEventListener('click', function () {
    // Перезагрузить страницу
    location.reload();

    // Прокрутить страницу вверх
    window.scrollTo(0, 0);
});

// Кнопка для перехода на страницу с тестами
document.getElementById("redirectButton").addEventListener("click", function () {
    // Здесь укажите URL страницы, на которую нужно перенаправить пользователя
    window.location.href = "#";
});