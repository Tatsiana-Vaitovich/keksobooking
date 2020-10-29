"use strict";

// фильтрую отрисованные на карте метки с помощью
// фильтров в .map__filters

(function() {

  // функция для подсчета рейтинга соответствия каждого объявления
  // запросу пользователя, указанному в фильтре
  function getRank(userNotice) {
    let rank = 0;
    const housingType = window.dom.mapFilters.elements["housing-type"];
    const housingPrice = window.dom.mapFilters.elements["housing-price"];
    const housingRooms = window.dom.mapFilters.elements["housing-rooms"];
    const housingGuests = window.dom.mapFilters.elements["housing-guests"];
    // это checkbox
    // массив элементов housingFeatures
    const housingFeatures = Array.from(window.dom.mapFilters.elements["housing-features"]
    .elements);
    const valueToHousingPrice = {
      "min": 10000,
      "max": 50000,
    };

    if (housingType.value === userNotice.offer.type) {
      rank++;
    }
    if (housingPrice.value === "middle") {
      if (valueToHousingPrice.min <= userNotice.offer.price && valueToHousingPrice.max > userNotice.offer.price) {
        rank++;
      }
    } else if (housingPrice.value === "high") {
      if (valueToHousingPrice.max <= userNotice.offer.price) {
        rank++;
      }
    } else if (housingPrice.value === "low") {
      if (valueToHousingPrice.min > userNotice.offer.price) {
        rank++;
      }
    }
    if (Number(housingRooms.value) === userNotice.offer.rooms) {
      rank++;
    }
    if (Number(housingGuests.value) === userNotice.offer.guests) {
      rank++;
    }
    housingFeatures.forEach(function(elem) {
      if (elem.checked) {
        rank++;
      }
    });
    return rank;
  }

  // напишем функцию-cb для сортировки массива по значению rank
  // т.к. по умолчанию sort() сортирует массив как "stroke";
  function compareRankOfUsersNotices(first, second) {
    const rankDiff = getRank(first) - getRank(second);
    if (rankDiff < 0) {
      return 1;
    } else if (rankDiff > 0) {
      return -1;
    } else {
      return 0;
    }
  }

  // похожие объявления будут отрисовываться после изменения выбора в полях
  // формы map__filters. для регистрации этих изменений использую событие change

  function updateUsersNotices() {
    // отсортируем массив usersNotices по рейтингу
    // соответствия запросу пользователя
    // для сортировки использую sort();
    // т.к метод sort() деструктивный,
    // результат сохраню в виде дубликата массива
    const newUsersNotices = window.data.usersNotices.sort(compareRankOfUsersNotices);
    // ??почему-то один change срабатывает как два
    // ??изменяется и исходный массив. может создать дубликат не по ссылке???
    console.log("new");
    newUsersNotices.forEach((elem) => console.log(elem.offer));
    // удаляем все mapPin кроме map__pin--main
    const arrMapPin = Array.from(window.dom.mapPins.children);
    arrMapPin.forEach(function(elem) {
      if (elem.classList.contains("map__pin") && !elem.classList.contains("map__pin--main")) {
        elem.parentNode.removeChild(elem);
      }
    });
    // отрисуем новые
    window.usersNotice.showMapPins(newUsersNotices);
  }

  window.dom.mapFilters.addEventListener("change", function(changeEvt) {
    const elem = changeEvt.target;
    if (elem.closest("select") || elem.closest("input")) {
      console.log("----");
      updateUsersNotices();
    }
    // window.setTimeout(updateUsersNotices, 500);
  });

})();
