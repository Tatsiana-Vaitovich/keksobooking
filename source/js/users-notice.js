"use strict";

// получаю объявления пользователей
// и mapPinы на основе этих объявлений

(function() {


  // напишу функцию для создания каждого элемента userNotice
  function getMapPin(i, arr) {
    const mapPin = window.createFragment.template.querySelector(".map__pin").cloneNode(true);
    mapPin.querySelector("img").src = arr[i].author.avatar;
    mapPin.querySelector("img").alt = arr[i].offer.title;
    mapPin.style = getStrokeCoordsCenter(i, arr);
    return mapPin;
  }

  // функции для получения координат центра метки:
  function getMapPinCoordCenterX(index, arr) {
    return arr[index].location.x - (1 / 2 * window.data.mapPinWidth);
  }

  function getMapPinCoordCenterY(index, arr) {
    return arr[index].location.y - window.data.mapPinHeight;
  }

  // функция для получения строки с координатами
  function getStrokeCoordsCenter(index, arr) {
    const x = getMapPinCoordCenterX(index, arr);
    const y = getMapPinCoordCenterY(index, arr);
    return "left:" + x + "px;" + " top:" + y + "px;";
  }

  // функция для получения объявлений пользователей
  // + дополнительный параметр - количество объявлений
  function getMapPins(arr, whereInsert, numberOfNotices) {
    for (let i = 0; i < numberOfNotices; i++) {
      whereInsert.append(getMapPin(i, arr));
    }
  }

  function showMapPins(data) {
    getMapPins(data, window.createFragment.elem1, window.constants.NUMBER_OF_USERS_NOTICES);
    window.util.insertChildrenAppend(window.createFragment.elem1, window.dom.mapPins);
  }


  window.usersNotice = {
    "getMapPins": getMapPins,
    "showMapPins": showMapPins,
  };
})();
