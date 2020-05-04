"use strict";
// ---1.создаю массив объявлений пользователей
const map = document.querySelector(".map");
const mapPins = document.querySelector(".map__pins");
const indent = 120;
let usersNotices = [];
const author = {};
// "title": строка, заголовок предложения, одно из фиксированных значений 
//. Значения не должны повторяться.
const titlesArr = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец", 
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде",
];
// "type": строка с одним из четырёх фиксированных значений: 
const typesArr = [
  "palace",
  "flat",
  "house",
  "bungalo",
];
// "checkin": строка с одним из трёх фиксированных значений: 
const checkinsArr = [
  "12:00",
  "13:00",
  "14:00",
];
// "checkout": строка с одним из трёх фиксированных значений: 
const checkoutsArr = [
  "12:00",
  "13:00",
  "14:00",
];
// "photos": массив из строк  расположенных в произвольном порядке
const photosArr = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg", 
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg",
];
// "features": массив строк случайной длины из ниже предложенных: 
const featuresArr = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];
const minPrice = 1000;
const maxPrice = 1000000;
const minRooms = 1;
const maxRooms = 5;
const minGuests = 1;
const maxGuests = 15;
const avatarsArr = getAvatars(1, 8);
const mapPinWidth = 50;
const mapPinHeight = 70;
const keyCodeEnter = 13;
const keyCodeEsc = 27;

// функция, генерирующая случайное число:
function getRandomNumber(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  // для получения случайного числа от min до max округляю rand до меньшего целого
  const random = Math.floor(rand);
  return random;
}

// для случайного выбора элемента из массива использую функцию
function getRandomElement(arr) {
  // мы должны генерировать числа от 0 до arr.lenght - 1
  // случайное число от min до (max+1)
  const min = 0;
  const max = arr.length - 1
  const random = getRandomNumber(min, max);
  return arr[random];
}

// для "перемешивания элементов массива" использую функцию:
function shuffle(arr) {
  let currentIndex = arr.length;
  let temporaryValue; //временное значение
  let randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
}

// "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, 
// где {{xx}} это число от 1 до 8 с ведущим нулём. 
// Например, 01, 02 и т. д. Адреса изображений не повторяются
// для получения аватар использую следующую функцию. 
// в данном случае получаю массив, содержащий нужные мне 8 элементов
function getAvatars(min, max) {
  let arr = [];
  for (let i = (min - 1); i < max; i++) {
    let url = "img/avatars/user0" + (i + 1) + ".png";
    arr[i] = url;
  }
  return arr;
}

// "location": {
// «x»: случайное число, координата x метки на карте. 
// Значение ограничено размерами блока, в котором перетаскивается метка.
// «y»: случайное число, координата y метки на карте от 130 до 630.
// беру у - случайное число, зависящее от высоты блока.
// для более корректного отображения также учту отступ - indent

function getLocation(indent) {
  const location = {};
  // const coordX = new GetCoord("x", mapPins, indent);
  // const coordY = new GetCoord("y", mapPins, indent);
  const coord = new GetCoord(mapPins, indent);
  location.x = coord.getCoordX();
  location.y = coord.getCoordY();
  return location;
}

// конструктор класса для получения координат метки
class GetCoord {
  // constructor(coordName, elem, indent) {
  constructor (elem, indent) {
    // this.coordName = coordName;
    this.elem = elem;
    this.indent = indent;
  }
  // getSizeName() {
  //   const W = "offsetWidth";
  //   const H = "offsetHeight";
  //   if (this.coordName === "x") {return W}
  //   else {return H}
  // }
  // getCoord() {
  //   const sizeName = this.getSizeName();
  //   const size = this.elem[sizeName];
  //   const coord = getRandomNumber(this.indent, (size - this.indent))
  //   return coord;
  // }
  getCoordX() {
    const size = this.elem.offsetWidth;
    const coord = getRandomNumber(this.indent, (size - this.indent));
    return coord;
  }
  getCoordY() {
    const size = this.elem.offsetHeight;
    const coord = getRandomNumber(this.indent, (size - this.indent));
    return coord;
  }
}

// функция для получения координат метки
function getStrokeCoords(location) {
  return (location.x + ", " + location.y);
  // return coords;
}

// "features": массив строк случайной длины 
// из элементов, перечисленных в массиве featuresArr
// для получения features использую функцию
function getFeatures(arr) {
  let initialArr = [];
  for (let i = 0; i < arr.length; i++) {
    initialArr[i] = arr[i];
  }
  const newArr = [];
  const elementsQuantity = getRandomNumber(0, initialArr.length);
  for (let i = 0; i < elementsQuantity; i++) {
    const element = getRandomElement(initialArr);
    const index = initialArr.indexOf(element);
    initialArr.splice(index, 1);
    newArr[i] = element;
  }
  return newArr;
}

// для создания js объектов, описывающих объявления пользователей, 
// использую конструктор объектов
function UserNotice(number, location) {
  this.author = new UserAuthor(number);
  this.offer = new UserOffer(number, location);
  this.location = location;
}

function UserAuthor(number) {
  this.avatar = avatarsArr[number];
}

function UserOffer(number, location){
  this.title = titlesArr[number];
  this.address = getStrokeCoords(location);
  this.price = getRandomNumber(minPrice, maxPrice);
  this.type = getRandomElement(typesArr);
  this.rooms = getRandomNumber(minRooms, maxRooms);
  this.guests = getRandomNumber(minGuests, maxGuests); 
  this.checkin = getRandomElement(checkinsArr);
  this.checkout = getRandomElement(checkoutsArr);
  this.features = getFeatures(featuresArr);
  this.description = "";
  this.photos = shuffle(photosArr);
}

// функция для создания массива, содержащего объявления пользователей
function createUsersNotices(elementsQuantity) {
  let usersNotices = [];
  for (let i = 0; i < elementsQuantity; i++) {
    const location = getLocation(indent);
    usersNotices[i] = new UserNotice(i, location);
  }
  return usersNotices;
}

// Создаю массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку
// перед тем как создать массив объектов, перемешаю массив заголовков
shuffle(titlesArr);
usersNotices = createUsersNotices(8);

// ---3. Cоздаю DOM-элементы на основе объекта usersNotices и шаблона <template>
// На основе данных, созданных в первом пункте, создайте DOM-элементы, 
// соответствующие меткам на карте, и заполните их данными из массива. 
// Итоговую разметку метки .map__pin можно взять из шаблона .map__card.
// У метки должны быть следующие данные:
// Координаты:style="left: {{location.x}}px; top: {{location.y}}px;"
// src="{{author.avatar}}"
// alt="{{заголовок объявления}}"

// получаю шаблон
const template = document.querySelector("#users-notice").content;
// создам фрагмент, в который буду "складывать" сгенерированные элементы
// ------??? похоже нужно избегать использвания document.....()???
let fragment = document.createDocumentFragment();

// создаю в фрагменте одельные div, в которые буду вставлять нужные элементы из шаблона
getElementsForFragment(3);

let elem1 = fragment.querySelector("#elem1"); // div для элементов .map__pin (userNotice)
let elem2 = fragment.querySelector("#elem2"); // div для элементов .popup__photo
let elem3 = fragment.querySelector("#elem3"); // div для элемента .map__card (Popup)

function getElementsForFragment(counter) {
  for (let i = 0; i < counter; i++) {
    const elem = document.createElement("div");
    elem.id = "elem" + (i + 1);
    fragment.append(elem);
  }
}

// напишу функцию для создания каждого элемента userNotice
function getMapPin(i) {
  const mapPin = template.querySelector(".map__pin").cloneNode(true);
  mapPin.querySelector("img").src = usersNotices[i].author.avatar;
  mapPin.querySelector("img").alt = usersNotices[i].offer.title;
  mapPin.style = getStrokeCoordsCenter(i);
  return mapPin;
}

// функции для получения координат центра метки:
function getMapPinCoordCenterX(index) {
return usersNotices[index].location.x - 1/2 * mapPinWidth;
}

function getMapPinCoordCenterY(index) {
  return usersNotices[index].location.y - mapPinHeight;
}

// функция для получения строки с координатами
function getStrokeCoordsCenter (index, elem) {
  let x = getMapPinCoordCenterX(index, elem);
  let y = getMapPinCoordCenterY(index, elem);
  return "left:" + x + "px;" + " top:" + y + "px;"
}

// функция для получения объявлений пользователей
function getMapPins(arr, whereInsert) {
  for (let i = 0; i < arr.length; i++) {
    whereInsert.append(getMapPin(i));
  }
}

// получу elem1 фрагмента из массива usersNotices
getMapPins(usersNotices, elem1)

// функция для вставки всех элементов из родительского блока:
function insertChildrenAppend(parentName, whereInsert) {
  let counter = parentName.children.length;
  for (let i = 0; i < counter; i++) {
    let child = parentName.firstChild;
    whereInsert.append(child);
  }
}

function insertChildrenBefore(parentName, whereInsert) {
  const counter = parentName.children.length;
  for (let i = 0; i < counter; i++) {
    const child = parentName.firstChild;
    whereInsert.before(child);
  }
}

// ---5. На основе первого по порядку элемента 
// из сгенерированного массива и шаблона .map__card 
// создаю DOM-элемент объявления, 
// заполняю его данными из объекта 
// и вставляю полученный DOM-элемент в блок .map 
// перед блоком.map__filters-container

function getPopup(number) {
  const popup = template.querySelector(".map__card").cloneNode(true);
  const userNotice = usersNotices[number];
  const capacity = getStrokeCapacity(number);
  const time = getStrokeTime(number);
  let whereInsertFeatures = popup.querySelector(".popup__features");
  let whereInsertPhotos = popup.querySelector(".popup__photos");
  popup.querySelector(".popup__avatar").src = userNotice.author.avatar;
  popup.querySelector(".popup__title").textContent = userNotice.offer.title;
  popup.querySelector(".popup__text--address").textContent = userNotice.offer.address;
  popup.querySelector(".popup__text--price").innerHTML = getStrokePrice(number);
  popup.querySelector(".popup__type").textContent = getStrokeType(number);
  popup.querySelector(".popup__text--capacity").textContent = capacity;
  popup.querySelector(".popup__text--time").textContent = time;
  popup.querySelector(".popup__description").textContent = userNotice.offer.description;
  clear(popup, ".popup__features");
  getElemFeatures(userNotice.offer.features, whereInsertFeatures);
  clear(popup, ".popup__photos");
  
  // получим elem2 фрагмента
  getPopupPhotos(userNotice.offer.photos);
  
  // вставим содержимое elem2 в элемент с классом popup__photos
  insertChildrenAppend(elem2, whereInsertPhotos);

  return popup;
}

// функция для получения строки price
function getStrokePrice(number) {
  const priceFromUserNotice = roundNumber(usersNotices[number].offer.price, 1000);
  const addStroke = "&#x20bd;<span>/ночь</span>";
  return priceFromUserNotice + addStroke;
}

// функция для округления числа
function roundNumber(number, to) {
  return Math.round((number)/to) * to;
}

// функция для получения строки type
function getStrokeType(number) {
  const typeFromUserNotice = usersNotices[number].offer.type;
  switch (typeFromUserNotice) {
    case "flat":
      return "Квартира";
    case "bungalo":
      return "Бунгало";
    case "house":
      return "Дом";
    case "palace":
      return "Дворец";
    default:
      return "Квартира";
    }
  }

// функция для получения строки capacity
function getStrokeCapacity(number) {
  const roomsFromUserNotice = usersNotices[number].offer.rooms;
  const guestsFromUserNotice = usersNotices[number].offer.guests;
  const capacity = roomsFromUserNotice + " комнаты для " + guestsFromUserNotice + " гостей";
  return capacity;
}

function getStrokeTime(number) {
  const checkinFromUserNotice = usersNotices[number].offer.checkin;
  const checkoutFromUserNotice = usersNotices[number].offer.checkout;
  const time = "Заезд после " + checkinFromUserNotice + ", выезд до " + checkoutFromUserNotice;
  return time;
}

// функция для очистки элемента
function clear(where, elem) {
  //DOM не поддерживает удаления элемента напрямую. 
  //При удалении элемента с JavaScript, 
  //мы должны сначала перейти на его РОДИТЕЛЕЙ. 
  let list = where.querySelector(elem);
  while (list.firstChild) {
  list.firstChild.remove();
  }
}

// функция для получения элементов блока .popup__features
function getElemFeatures(arr, whereInsert) {
  for (let elem = 0; elem < arr.length; elem++) {
    const newElem = document.createElement("li");
    const newClass = "popup__feature--" + arr[elem];
    newElem.className = "popup__feature";
    newElem.classList.add(newClass);
    whereInsert.append(newElem);
  }
}

// функция для получения элементов блока .popup__photos. Для их создания использую шаблон
function getPopupPhotos(arr) {
  for (let elem = 0; elem < arr.length; elem++) {
    const popupPhoto = template.querySelector(".popup__photo").cloneNode(true);
    popupPhoto.src = arr[elem];
    elem2.append(popupPhoto);
  }
  return elem2;
}

// // вставим Popup в elem3 фрагмента
// elem3.append(getPopup(0));

// вставим содержимое elem3 в документ - элемент с классом .map__filters-container
// let block3 = document.querySelector(".map__filters-container");
// insertChildrenBefore(elem3, block3);

// ----ДЗ НОВОЕ------

// ----- неактивное состояние карты. Пункт «Неактивное состояние» технического задания
// Переключаем карту из активного состояния в неактивное
// addClass(map, "map--faded");

// проверяю, соответствует ли проект требованиям ТЗ
// + Форма заполнения информации об объявлении .ad-form 
// содержит класс ad-form--disabled

// Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled, 
// добавленного на них или на их родительские блоки fieldset
// Форма с фильтрами .map__filters заблокирована так же, 
// как и форма .ad-form.

const form = document.querySelector(".ad-form");
const formElements = form.querySelectorAll(".ad-form__element");
const mapFilter = document.querySelector(".map__filters");
const mapFilterelects = mapFilter.querySelectorAll("select");
const mapFilterInputs = mapFilter.querySelectorAll("input");
const mainPin = document.querySelector(".map__pin--main");
const bigMainPin = mainPin.querySelector("svg");
const formAdress = document.querySelector("#address");

formAdress.value = getMainPinCoordStroke();

formElements.forEach(function(elem) {
  if (elem.querySelector("input") || elem.querySelector("select")) {
    addDisabled(elem);
  }
});
mapFilterelects.forEach(function(elem) {
  addDisabled(elem);
});
mapFilterInputs.forEach(function(elem) {
  addDisabled(elem);
});

// -------Активирование карты

// Любое перетаскивание состоит из трёх фаз: захвата элемента, 
// его перемещения и отпускания элемента. На данном этапе 
// нам достаточно описать реакцию на третью фазу: отпускание элемента. 
// Для этого нужно добавить обработчик события mouseup на элемент 
// .map__pin--main.
// Обработчик события mouseup должен вызывать функцию, 
// которая будет отменять изменения DOM-элементов, 
// описанные в пункте «Неактивное состояние» технического задания
// --- у меня в неактивном состоянии какты элементы mapPin видны. "спрячу" их.

mainPin.addEventListener("mouseup", onMainPinActivatePage)

function onMainPinActivatePage(evt) {
// ---4.Вставляю все полученные элементы из elem1 за один прием в блок ".map__pins"
  const block1 = document.querySelector(".map__pins");
  insertChildrenAppend(elem1, block1);

  removeClass(map, "map--faded");
  removeClass(form, "ad-form--disabled");
  formElements.forEach(function(elem) {
    if (elem.querySelector("input") || elem.querySelector("select")) {
      removeDisabled(elem);
    }
  });
  mapFilterelects.forEach(function(elem) {
    removeDisabled(elem);
  });
  mapFilterInputs.forEach(function(elem) {
    removeDisabled(elem);
  });
  mapPins.querySelectorAll(".map__pin").forEach(function(elem) {
  removeClass(elem, "visually-hidden");
  })
};

function addClass(elem, className) {
  elem.classList.add(className);
}

function removeClass(elem, className) {
  elem.classList.remove(className);
}

function addDisabled(elem) {
  elem.setAttribute("disabled", "");
}

function removeDisabled(elem) {
  elem.removeAttribute("disabled");
}

// для доступности на мобильных устройствах добавлю touchEvents
mainPin.addEventListener("touchend", onMainPinActivatePage)

// ---------Заполнение поля адреса
// поле адреса должно быть заполнено всегда, 
// в том числе сразу после открытия страницы. 
// мы можем взять за исходное значение поля адреса середину метки.

function getMainPinCoord(coordName) {
  let coord;
  if (coordName === "x") {
    coord = mainPin.offsetLeft + 1/2 * mainPin.offsetWidth;
  } else {
    coord = mainPin.offsetTop + 1/2 * mainPin.offsetHeight;
  }
  return coord;
}

function getMainPinCoordStroke() {
  return roundNumber(getMainPinCoord("x"), 10) + ", "+ roundNumber(getMainPinCoord("y"), 10)
}

// ------- Перетаскивание метки реализую используя события мыши

// отменю браузерные события на map - чтобы текст "и снова токио" не выделялся при щелчке
map.addEventListener("mousedown", function(evt) {
  evt.preventDefault();
})

// чтобы не сработало браузерное событие drag_and_drop
mainPin.addEventListener("dragstart", function() {
  return false;
});

// получу координаты относительно документа, 
// чтобы учитывать прокрутку страницы при перемещении mainPin
const pageScrollX = window.pageXOffset;
const pageScrollY = window.pageYOffset;
const mainPinWidth = mainPin.offsetWidth;
const bigMainPinWidth = bigMainPin.width.baseVal.value;
const mapBoundingClientRect = map.getBoundingClientRect();
const mapLeft = mapBoundingClientRect.left + pageScrollX;
const mapTop = mapBoundingClientRect.top + pageScrollY;
const mapWidth = map.offsetWidth;
const mapHeight = map.offsetHeight;
const mapFilterHeight = mapFilter.offsetHeight;
const mainPinBorder = (bigMainPinWidth - mainPinWidth) * 1/2;

// чтобы изначальный сдвиг курсора на элементе сохранялся запоминаем этот сдвиг:
let mainPinCoordCapture = {};
// также запомню координаты, где "остановились"
let mainPinCoordDrop = {};

// mainPin.addEventListener("mousedown", onMainPinMouseDown);
mainPin.addEventListener("mousedown", onMainPinCursorStart);
mainPin.addEventListener("touchstart", onMainPinCursorStart);

function onMainPinCursorStart(evt) {
  evt.preventDefault();

  let captureX;
  let captureY;
  if (evt.type == "mousedown") {
    captureX = evt.clientX;
    captureY = evt.clientY;
    map.addEventListener("mousemove", onMapCursorMove);
    map.addEventListener("mouseup", onMapCursorEnd);
  } else if (evt.type == "touchstart") {
    captureX = evt.touches[0].clientX;
    captureY = evt.touches[0].clientY;
    map.addEventListener("touchmove", onMapCursorMove);
    map.addEventListener("touchend", onMapCursorEnd);
  }
  getCaptureCoords(captureX, captureY);
}

function getCaptureCoords(captureX, captureY) {
  const mainPinBoundingClientRect = mainPin.getBoundingClientRect();
  const mainPinLeft = mainPinBoundingClientRect.left;
  const mainPinTop = mainPinBoundingClientRect.top;

  mainPinCoordCapture.x = captureX - mainPinLeft;
  mainPinCoordCapture.y = captureY - mainPinTop;
}

function onMapCursorMove(evt) {
  let newX;
  let newY;
  if (evt.type == "mousemove") {
    newX = evt.clientX;
    newY = evt.clientY;
  } else if (evt.type == "touchmove") {
    newX = evt.touches[0].clientX;
    newY = evt.touches[0].clientY;
  }
  getNewCoords(newX, newY);
}

function getNewCoords(newX, newY) {
  // на протяжении всего перетаскивания нужно следить за тем, 
  // чтобы метка не вышла за пределы карты
  const pageScrollX = window.pageXOffset;
  const pageScrollY = window.pageYOffset;

  let newLeft = newX + pageScrollX - mapLeft - mainPinCoordCapture.x 
  let newTop = newY + pageScrollY - mapTop - mainPinCoordCapture.y 

  const minLeft = mainPinBorder + pageScrollX;
  const maxLeft = mapWidth - mapPinWidth - mainPinBorder + pageScrollX;
  const minTop = mainPinBorder + pageScrollY;
  const maxTop = mapHeight - mapPinHeight - mainPinBorder - mapFilterHeight;
  // mapPin вышла из map => оставить mapPin в еe границах.
  if (newLeft < minLeft) {
    newLeft = minLeft;
  } else if (newLeft > maxLeft) {
    newLeft = maxLeft;
  } 
  if (newTop < minTop) {
    newTop = minTop;
  } else if (newTop > maxTop) {
    newTop = maxTop;
  }
  mainPin.style.top = newTop + "px";
  mainPin.style.left = newLeft + "px";
  mainPinCoordDrop.x = newLeft;
  mainPinCoordDrop.y = newTop;
}

function onMapCursorEnd(evt) {
  let newLeft;
  let newTop;
  if (evt.type == "mouseup") {
    newLeft = mainPinCoordDrop.x;
    newTop = mainPinCoordDrop.y;
    mainPin.style.top = newTop + "px";
    mainPin.style.left = newLeft + "px";

    map.removeEventListener("mousemove", onMapCursorMove);
    map.removeEventListener("mouseup", onMapCursorEnd);
  } else if (evt.type == "touchend") {
    const mainPinBoundingClientRect = mainPin.getBoundingClientRect();
    const mainPinLeft = mainPinBoundingClientRect.left;
    const mainPinTop = mainPinBoundingClientRect.top;
    const mapBoundingClientRect = map.getBoundingClientRect();
    const mapLeft = mapBoundingClientRect.left;
    const mapTop = mapBoundingClientRect.top;
    newLeft = mainPinLeft - mapLeft;
    newTop = mainPinTop - mapTop;

    map.removeEventListener("touchend", onMapCursorEnd);
    map.removeEventListener("touchmove", onMapCursorMove);
  }
  // заполним поле адреса
  fillFormAdress(newLeft, newTop);
}

function fillFormAdress(newLeft, newTop) {
  const roundValueX = roundNumber((newLeft), 1);
  const roundValueY = roundNumber((newTop), 1);
  formAdress.value = roundValueX + ", " + roundValueY;
}

// ------- Просмотр подробной информации о похожих объявлениях
map.addEventListener("click", onMapPopupOpen);

let lastElementInFocus;

function onMapPopupOpen(evt) {
  const elem = evt.target;
  if ((elem.closest(".map__pin")) && !(elem.closest(".map__pin--main"))) {
    if (!document.querySelector(".popup")) {
    openPopup();
    lastElementInFocus = elem.closest(".map__pin");
    document.querySelector(".popup__close").focus();
    } else {closePopup()}
  } else if (elem.closest(".popup__close")) {
    closePopup();
    lastElementInFocus.focus();
  }
}

function openPopup() {
  const block3 = document.querySelector(".map__filters-container");
  elem3.append(getPopup(0));
  insertChildrenBefore(elem3, block3);

  document.addEventListener("keydown", onPopupEnterOREscPress)
}

function closePopup() {
  const popup = map.querySelector(".popup");
  popup.parentElement.removeChild(popup);

  document.removeEventListener("keydown", onPopupEnterOREscPress);
}

// для доступности добавлю keyEvents, чтобы можно было закрыть popup
// нажав кнопку esc на документе или нажав кнопку Enter на самом элементе buttonClose

// обработчик "закрыть/открыть с клавиатур popup"
function onPopupEnterOREscPress(evt) {
  switch (evt.keyCode) {
    case keyCodeEnter:
      if(!document.querySelector(".popup")) {
      openPopup();
    } break;
    case keyCodeEsc:
      closePopup();
  }
}

// ------ 2 часть задания - опишем сценарии взаимодействия пользователя с формой отправки данных и саму отправку

// в соответствии с ТЗ поле "тип жилья" и минимальное значение в поле "цена за ночь" взаимосвязаны

const price = document.querySelector("#price");
const type = document.querySelector("#type");
const timein = document.querySelector("#timein");
const timeout = document.querySelector("#timeout");
const roomNumber = document.querySelector("#room_number");
const capacity = document.querySelector("#capacity");

const minPriceArr = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

type.addEventListener("change", function() {
  const value = this.value;
  console.log(value);
  switch (value) {
    case "bungalo":
      getMinForFieldPrice("bungalo");
      break;
    case "flat":
      getMinForFieldPrice("flat");
      break;
    case "house":
      getMinForFieldPrice("house");
      break;
    case "palace":
      getMinForFieldPrice("palace");
  }
});

function getMinForFieldPrice(type) {
  price.setAttribute("min", minPriceArr[type]);

  const valueMin = price.getAttribute("min");

  price.setAttribute("placeholder", valueMin);
}

// в соответствии с ТЗ Поля «Время заезда» и «Время выезда» синхронизированы: 
// при изменении значения одного поля, во втором выделяется соответствующее ему. 

timein.addEventListener("change", function() {
  newValueForTimeout.getValue();
});

timeout.addEventListener("change", function() {
  newValueForTimein.getValue();
});

// Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, 
// что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:

// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей»;

roomNumber.addEventListener("change", function() {
  newValueForCapacity.getCapacity();
})

class NewValue {
  constructor(current, target) {
    this.targetElem = target;
    this.currentElem = current;
  }
  clearElem(condition, value) {
    const children = this.targetElem.querySelectorAll("option");
    console.log(children);
    for(let i = 0; i < children.length; i++ ) {
      children[i].style.display = "";
      console.log("value " + value);
      console.log("childrenV " + children[i].value);
      if (children[i].value !== (condition)) {
        console.log("delete");
        children[i].style.display = "none";
      }
    }
  }
  hiddenTargetElemChildren() {
    const targetElemChildren = this.targetElem.querySelectorAll("option");
    targetElemChildren.forEach(elem => {
      elem.style.display = "none";
    })
  }
  showTargetElemChild(condition) {
    const targetElemChildren = this.targetElem.querySelectorAll("option");
    targetElemChildren.forEach(elem => {
      if (elem.value === condition) {
        elem.style.display = "";
      }
    })
  }
  getValue() {
    const value = this.currentElem.value;
    this.targetElem.value = value;
  }
  getCapacity() {
    let value = this.currentElem.value;
    this.targetElem.value = value;
    this.hiddenTargetElemChildren();
    switch (value) {
      case "1": 
        this.showTargetElemChild("1")
        break;
      case "100":
        this.targetElem.value = "0";
        this.showTargetElemChild("0")
        break;
      case "2":
        this.showTargetElemChild("1")
        this.showTargetElemChild("2")
        break;
      case "3": 
        this.showTargetElemChild("1")
        this.showTargetElemChild("2")
        this.showTargetElemChild("3")
    }
  }
};

const newValueForTimeout = new NewValue(timein, timeout);
const newValueForTimein = new NewValue(timeout, timein);
const newValueForCapacity = new NewValue(roomNumber, capacity);

