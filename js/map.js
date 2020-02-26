"use strict";
// ---1.создаю массив объявлений пользователей
const map = document.querySelector(".map");
let usersNotices = [];
let autor = {};
// "title": строка, заголовок предложения, одно из фиксированных значений 
//. Значения не должны повторяться.
let titlesArr = [
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
let typesArr = [
  "palace",
  "flat",
  "house",
  "bungalo",
];
// "checkin": строка с одним из трёх фиксированных значений: 
let checkinsArr = [
  "12:00",
  "13:00",
  "14:00",
];
// "checkout": строка с одним из трёх фиксированных значений: 
let checkoutsArr = [
  "12:00",
  "13:00",
  "14:00",
];
// "photos": массив из строк  расположенных в произвольном порядке
let photosArr = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg", 
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg",
];
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
  let min = 0;
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
  // определим размер родительского блока .map, в котором находится метка
  const mapWidth = map.offsetWidth;
  const mapHeight = map.offsetHeight;
  const x = getRandomNumber(indent, mapWidth - indent);
  const y = getRandomNumber(indent, mapHeight - indent);
  location.x = x;
  location.y = y;
  return location;
}

function getCoords() {
  const location = getLocation(120);
  const coords = location.x + ", " + location.y;
  return coords;
}

// "features": массив строк случайной длины 
// из элементов, перечисленных в массиве featuresArr
// для получения features использую функцию
function getFeatures() {
  // "features": массив строк случайной длины из ниже предложенных: 
  let featuresArr = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner",
  ];
  let newArr = [];
  const arrLength = featuresArr.length;
  const elementsQuantity = getRandomNumber(1, arrLength);
  for (let i = 1; i <= elementsQuantity; i++) {
    let element = getRandomElement(featuresArr);
    const index = featuresArr.indexOf(element);
    featuresArr.splice(index, 1);
    newArr[i-1] = element;
  }
  return newArr;
}

// для создания js объектов, описывающих объявления пользователей, 
// использую конструктор объектов
function UserNotice(number) {
  this.autor = getAvatars(1, 8)[number-1];
  this.title = titlesArr[number-1];
  this.address = getCoords();
  this.price = getRandomNumber(1000, 1000000);
  this.type = getRandomElement(typesArr);
  this.rooms = getRandomNumber(1, 5);
  this.guests = getRandomNumber(0, 15); 
  this.checkin = getRandomElement(checkinsArr);
  this.checkout = getRandomElement(checkoutsArr);
  this.features = getFeatures();
  this.description = "";
  this.photos = shuffle(photosArr);
}

// в соответствии с заданием нужно создать 8 таких объектов -
// Создаю массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку
function createUsersNotices(elementsQuantity) {
  let usersNotices = [];
  for (let i = 1; i <= elementsQuantity; i++) {
    usersNotices[i-1] = new UserNotice(i);
  }
  return usersNotices;
}
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

// функции для получения координат метки из объекта usersNotice[i]
function getCoordХFromAdress(i) {
  const index = usersNotices[i].address.indexOf(",");
  const coordX = usersNotices[i].address.slice(0, index);
  return +coordX;
}

function getCoordYFromAdress(i) {
  const index = usersNotices[i].address.indexOf(",");
  const coordY = usersNotices[i].address.slice(index + 2);
  return +coordY;
}

// получаю шаблон
const template1 = document.querySelector("#users-notice").content;
// создам фрагмент, в который буду "складывать" сгенерированные элементы
let fragment1 = document.createDocumentFragment();
// напишу функцию для создания каждого элемента userNotice
function getUserNotice(i) {
  const newElem1 = template1.querySelector(".map__pin").cloneNode(true);
  newElem1.querySelector("img").src = usersNotices[i].autor;
  newElem1.querySelector("img").alt = usersNotices[i].title;
  const x = getCoordХFromAdress(i) + 1/2 * newElem1.offsetWidth;
  const y = getCoordYFromAdress(i) + newElem1.offsetHeight;
  newElem1.style = "left:" + x + "px;" + " top:" + y + "px;";
  return newElem1;
}

// получу фрагмент, перебирая каждый элемент массива usersPhoto
for (let i = 0; i < usersNotices.length; i++) {
fragment1.append(getUserNotice(i));
}

// ---4.Вставляю все полученные элементы за один прием в блок ".users-photo"
  let block1 = document.querySelector(".map__pins");
  block1.append(fragment1);

// ---5. На основе первого по порядку элемента 
// из сгенерированного массива и шаблона .map__card 
// создаю DOM-элемент объявления, 
// заполняю его данными из объекта 
// и вставляю полученный DOM-элемент в блок .map 
// перед блоком.map__filters-container

const template2 = document.querySelector("#users-notice").content;
let fragment2 = document.createDocumentFragment();
let fragment3 = document.createDocumentFragment();

function getUserBigNotice(number) {
  const newElem2 = template2.querySelector(".map__card").cloneNode(true);
  const userNotice = usersNotices[number];
  const x = getCoordХFromAdress(number) + 1/2 * newElem2.offsetWidth;
  const y = getCoordYFromAdress(number) + newElem2.offsetHeight;
  const capacity = userNotice.rooms + " комнаты для " + userNotice.guests + " гостей";
  const time = "Заезд после " + userNotice.checkin + ", выезд до " + userNotice.checkout;
  let whereInsertFeatures = newElem2.querySelector(".popup__features");
  let whereInsertPhotos = newElem2.querySelector(".popup__photos");
  newElem2.querySelector(".popup__avatar").src = userNotice.autor
  newElem2.style = "left:" + x + "px;" + " top:" + y + "px;";
  newElem2.querySelector(".popup__text--address").textContent = userNotice.price;
  newElem2.querySelector(".popup__type").textContent = UserNotice.type;
  newElem2.querySelector(".popup__text--capacity").textContent = capacity;
  newElem2.querySelector(".popup__text--time").textContent = time;
  newElem2.querySelector(".popup__description").textContent = userNotice.description;
  clear(newElem2, ".popup__features");
  getElemFeatures(userNotice.features, whereInsertFeatures);
  clear(newElem2, ".popup__photos");
  whereInsertPhotos.append(getElemPhotos(userNotice.photos));
  return newElem2;
}

// напишем функцию для очистки элемента
function clear(where, elem) {
  //DOM не поддерживает удаления элемента напрямую. 
  //При удалении элемента с JavaScript, 
  //мы должны сначала перейти на его РОДИТЕЛЕЙ. 
  let list = where.querySelector(elem);
  while (list.firstChild) {
  list.firstChild.remove();
  }
}

function getElemFeatures(arr, whereInsert) {
  for (let elem = 0; elem < arr.length; elem++) {
    const newElem = document.createElement("li");
    const newClass = "popup__feature--" + arr[elem];
    newElem.className = "popup__feature";
    newElem.classList.add(newClass);
    whereInsert.append(newElem);
  }
}

function getElemPhotos(arr) {
  for (let elem = 0; elem < arr.length; elem++) {
    const newElem = template2.querySelector(".popup__photo").cloneNode(true);
    newElem.src = arr[elem];
    fragment3.append(newElem);
  }
  return fragment3;
}

fragment2.append(getUserBigNotice(0));
let block2 = document.querySelector(".map__filters-container");
block2.before(fragment2);
