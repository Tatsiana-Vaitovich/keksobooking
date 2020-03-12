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
  for (let i = min; i <= max; i++) {
    let url = "img/avatars/user0" + i + ".png";
    arr[i - 1] = url;
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
  // определим размер родительского блока mapPins, в котором находится метка
  // const mapPinsWidth = mapPins.offsetWidth;
  // const mapPinsHeight = mapPins.offsetHeight;
  // const x = getRandomNumber(indent, mapPinsWidth - indent);
  // const y = getRandomNumber(indent, mapPinsHeight - indent);
  // location.x = x;
  // location.y = y;
  // технически любая функция может быть использована как конструктор. 
  // То есть, каждая функция может быть вызвана при помощи оператора new
  // вместо кода выше использую конструктор функции
  const coordX = new GetCoord(mapPins, "x", indent);
  const coordY = new GetCoord(mapPins, "y", indent);
  location.x = coordX.coord;
  location.y = coordY.coord;
  return location;
}

// конструктор функции для получения координат метки
function GetCoord(elem, coordName, indent) {
  this.coordName = coordName;
  this.elem = elem;
  this.indent = indent;
  this.getSize = function() {
    (coordName == "x") ? this.size = elem.offsetWidth : this.size = elem.offsetHeight;
    return this.size;
  }
  this.coord = getRandomNumber(this.indent, this.getSize() - this.indent);
}

// функция для получения координат метки
function getStrokeCoords(location) {
  const coords = location.x + ", " + location.y;
  return coords;
}

// "features": массив строк случайной длины 
// из элементов, перечисленных в массиве featuresArr
// для получения features использую функцию
function getFeatures() {
  let initialArr = [];
  for (let i = 0; i < featuresArr.length; i++) {
    initialArr[i] = featuresArr[i];
  }
  const newArr = [];
  const elementsQuantity = getRandomNumber(0, initialArr.length);
  for (let i = 0; i < elementsQuantity; i++) {
    let element = getRandomElement(initialArr);
    let index = initialArr.indexOf(element);
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
  this.features = getFeatures();
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

// ---2. Переключаем карту из неактивного состояния в активное
map.classList.remove("map--faded");

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
let fragment = document.createDocumentFragment();

// создаю в фрагменте одельные div, в которые буду вставлять нужные элементы из шаблона
getElementsForFragment(3);

let elem1 = fragment.querySelector("#elem1"); // div для элементов .map__pin (userNotice)
let elem2 = fragment.querySelector("#elem2"); // div для элементов .popup__photo
let elem3 = fragment.querySelector("#elem3"); // div для элемента .map__card (Popup)

function getElementsForFragment(counter) {
  for (let i = 0; i < counter; i++) {
    let elem = document.createElement("div");
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
  const x = usersNotices[index].location.x - 1/2 * mapPinWidth;
  return x;
}

function getMapPinCoordCenterY(index) {
  const y = usersNotices[index].location.y - mapPinHeight;
  return y;
}

// функция для получения строки с координатами
function getStrokeCoordsCenter (index, elem) {
  let x = getMapPinCoordCenterX(index, elem);
  let y = getMapPinCoordCenterY(index, elem);
  let str = "left:" + x + "px;" + " top:" + y + "px;"
  return str;
}

// функция для получения объявлений пользователей
function getMapPins(arr, whereInsert) {
  for (let i = 0; i < arr.length; i++) {
    whereInsert.append(getMapPin(i));
  }
}

// получу elem1 фрагмента из массива usersNotices
getMapPins(usersNotices, elem1)

// ---4.Вставляю все полученные элементы из elem1 за один прием в блок ".map__pins"
let block1 = document.querySelector(".map__pins");
insertChildrenAppend(elem1, block1);

// функция для вставки всех элементов из родительского блока:
function insertChildrenAppend(parentName, whereInsert) {
  let counter = parentName.children.length;
  for (let i = 0; i < counter; i++) {
    let child = parentName.firstChild;
    whereInsert.append(child);
  }
}

function insertChildrenBefore(parentName, whereInsert) {
  let counter = parentName.children.length;
  for (let i = 0; i < counter; i++) {
    let child = parentName.firstChild;
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
  const price = priceFromUserNotice + addStroke;
  return price;
}

// функция для округления числа
function roundNumber(number, to) {
  const roundNumber = Math.round((number)/to) * to;
  return roundNumber;
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

// вставим Popup в elem3 фрагмента
elem3.append(getPopup(0));

// вставим содержимое elem3 в документ - элемент с классом .map__filters-container
let block3 = document.querySelector(".map__filters-container");
insertChildrenBefore(elem3, block3);
