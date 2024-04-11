const langButtons = document.querySelectorAll("[data-btn]");
const allLangs = ["ru", "en"];
const currentPathName = window.location.pathname;
let currentLang = localStorage.getItem("language") || checkBrowserLang() || "ru";
let currentTexts = {};

let homeTexts; // Объявляем переменную homeTexts здесь

// Загрузка содержимого файла translate.json
fetch('./public/translate.json')
	.then(response => response.json())
	.then(data => {
		// Присваиваем загруженные данные переменной homeTexts
		homeTexts = data;

		// Вызываем функцию для установки текстов на странице
		checkPagePathName();
		changeLang();
		checkActiveLangButton();
	})
	.catch(error => console.error('Error loading translate.json:', error));

// Проверка пути страницы сайта
function checkPagePathName() {
	switch (currentPathName) {
		case "/index.html":
			currentTexts = homeTexts;
			break;
		default:
			currentTexts = homeTexts;
			break;
	}
}
checkPagePathName();

// Изменение языка у текстов
function changeLang() {
	for (const key in currentTexts) {
		let elem = document.querySelector(`[data-lang=${key}]`);
		if (elem) {
			elem.textContent = currentTexts[key][currentLang];
		}
	}
}
changeLang();

langButtons.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		if (!event.target.classList.contains("header__btn_active")) {
			currentLang = event.target.dataset.btn;
			localStorage.setItem("language", event.target.dataset.btn);
			resetActiveClass(langButtons, "header__btn_active");
			resetActiveClass(langButtons, "header__btn_non-active"); // Убираем классы для всех кнопок
			btn.classList.add("header__btn_active"); // Добавляем класс для активной кнопки
			changeLang(); // Обновляем тексты на странице
		}
	});
});

// Сброс активного класса у переданного массива элементов
function resetActiveClass(arr, activeClass) {
	arr.forEach((elem) => {
		elem.classList.remove(activeClass);
	});
}

// Проверка активной кнопки
function checkActiveLangButton() {
	switch (currentLang) {
		case "ru":
			document
				.querySelector('[data-btn="ru"]')
				.classList.add("header__btn_active");
			document
				.querySelector('[data-btn="en"]')
				.classList.add("header__btn_non-active");
			break;
		case "en":

			document
				.querySelector('[data-btn="en"]')
				.classList.add("header__btn_active");

			document
				.querySelector('[data-btn="ru"]')
				.classList.add("header__btn_non-active");
			break;
		default:
			document
				.querySelector('[data-btn="ru"]')
				.classList.add("header__btn_active");
			document
				.querySelector('[data-btn="en"]')
				.classList.add("header__btn_non-active");
			break;
	}
}
checkActiveLangButton();

// Проверка языка браузера
function checkBrowserLang() {
	const navLang = navigator.language.slice(0, 2).toLowerCase();
	const result = allLangs.some((elem) => {
		return elem === navLang;
	});
	if (result) {
		return navLang;
	}
}

document.querySelectorAll(".ru").forEach(function (btn) {
	btn.addEventListener("click", function () {
		document.querySelectorAll(".first_name").forEach(function (input) {
			input.placeholder = "Имя (на английском)*";
		});
		document.querySelectorAll(".last_name").forEach(function (input) {
			input.placeholder = "Фамилия (на английском)*";
		});
	});
});

document.querySelectorAll(".en").forEach(function (btn) {
	btn.addEventListener("click", function () {
		document.querySelectorAll(".first_name").forEach(function (input) {
			input.placeholder = "First name*";
		});
		document.querySelectorAll(".last_name").forEach(function (input) {
			input.placeholder = "Last name*";
		});
	});
});