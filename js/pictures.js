"use strict";
// Создайте массив, состоящий из 25 сгенерированных JS объектов, 
// которые будут описывать фотографии, размещённые другими пользователями
let usersPhoto = [];
let allComments = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];
let allDesctiptions = [
  "Тестим новую камеру!",
  "Затусили с друзьями на море",
  "Как же круто тут кормят",
  "Отдыхаем...",
  "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
  "Вот это тачка!",
];
let allUrls = getUrls(1, 25);

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
// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25. Адреса картинок не должны повторяться
// сгенерирую url

function getUrls(min, max) {
  let arr = [];
  for (let i = min; i <= max; i++) {
    let url = "photos/" + i + ".jpg";
    arr[i - 1] = url;
  }
  return arr;
}
// comments, массив строк — список комментариев, оставленных другими пользователями к этой фотографии. 
// Количество комментариев к каждой фотографии произвольное. 
// Комментарии генерируются случайным образом. 
// Для формирования комментария необходимо взять одно или два случайных предложений 

function getComments() {
  let comments = [];
  let min = 1;
  let max = 2;
  // для случайного выбора количества комментариев использую функцию getRandomNumber
  let quantity = getRandomNumber(min, max);
  // для случайного выбора элемента из массива комментариев использую функцию getRandomElement
  for (let i = 1; i <= quantity; i++) {
    let comment = getRandomElement(allComments);
    comments[i - 1] = comment;
  }
  return comments;
}


// для создания js объектов, описывающих фоторграфии пользователей, можно использовать конструктор объектов
function UserPhoto(number) {
  this.url = allUrls[number - 1];
  this.likes = getRandomNumber(15, 200);
  this.comments = getComments();
  this.description =getRandomElement(allDesctiptions);
}

// в соответствии с заданием нужно создать 25 таких объектов -
// Создайте массив, состоящий из 25 сгенерированных JS объектов, которые будут описывать фотографии, размещённые другими пользователями

function createUsersPhoto(elementsQuantity) {
  let usersPhoto = [];
  for (let i = 1; i <= elementsQuantity; i++) {
    usersPhoto[i-1] = new UserPhoto(i);
  }
  return usersPhoto;
}

usersPhoto = createUsersPhoto(25);

