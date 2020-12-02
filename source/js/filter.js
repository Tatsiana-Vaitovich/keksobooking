"use strict";

// фильтрую отрисованные на карте метки с помощью
// фильтров в .map__filters

(function() {

  const housingType = window.dom.mapFilters.elements["housing-type"];
  const housingPrice = window.dom.mapFilters.elements["housing-price"];
  const housingRooms = window.dom.mapFilters.elements["housing-rooms"];
  const housingGuests = window.dom.mapFilters.elements["housing-guests"];
  // housing-features это fieldset, содержащий checkbox.
  // получу массив элементов, содержащий эти checkbox
  const housingFeatures = Array.from(window.dom.mapFilters.elements["housing-features"]
  .elements);
  const valueToHousingPrice = {
    "min": 10000,
    "max": 50000,
  };

  // функция для подсчета рейтинга соответствия каждого объявления
  // запросу пользователя, указанному в фильтре
  function getRank(userNotice) {
    let rank = 0;

    if (compareHousingType(userNotice)) {
      rank++;
    }
    if (compareHousingPrice(userNotice)) {
      rank++;
    }
    if (compareHousingRooms(userNotice)) {
      rank++;
    }
    if (compareHousingGuests(userNotice)) {
      rank++;
    }
    if (compareHousingFeatures(userNotice)) {
      rank = rank + compareHousingFeatures(userNotice);
    }
    return rank;
  }

  function compareHousingType(arr) {
    return (housingType.value === arr.offer.type);
  }

  function compareHousingPrice(arr) {
    if (housingPrice.value === "middle") {
      if (valueToHousingPrice.min <= arr.offer.price && valueToHousingPrice.max > userNotice.offer.price) {
        return true;
      }
    } else if (housingPrice.value === "high") {
      if (valueToHousingPrice.max <= arr.offer.price) {
        return true;
      }
    } else if (housingPrice.value === "low") {
      if (valueToHousingPrice.min > arr.offer.price) {
        return true;
      }
    }
  }

  function compareHousingRooms(arr) {
    if (Number(housingRooms.value) === arr.offer.rooms) {
      return true;
    }
  }

  function compareHousingGuests(arr) {
    if (Number(housingGuests.value) === arr.offer.guests) {
      return true;
    }
  }

  function compareHousingFeatures(arr) {
    let counter = 0;
    housingFeatures.forEach(function(elem) {
      if (elem.checked) {
        // для того, чтобы проверить, содержится ли данное свойство
        // в рассматриваемом массиве использую метод includes().
        // возвращает boolean
        if (arr.offer.features.includes(elem.value)) {
          counter++;
        }
      }
    });
    return counter;
  }

  // напишем функцию-callback для сортировки массива по значению rank
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

  function updateUsersNotices() {
    // отсортируем массив usersNotices по рейтингу
    // соответствия запросу пользователя
    // для сортировки использую sort();
    // т.к метод sort() деструктивный,
    // результат сохраню в виде дубликата массива
    const newUsersNotices = window.data.usersNotices.sort(compareRankOfUsersNotices);
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
  // похожие объявления будут отрисовываться после изменения выбора в полях
  // формы map__filters. для регистрации этих изменений использую событие change
  window.dom.mapFilters.addEventListener("change", function(changeEvt) {
    const elem = changeEvt.target;
    if (elem.closest("select") || elem.closest("input")) {
      console.log("----");
      // вместо обычного вызова функции для устранения "дребезга"
      // вызову специальную функцию debounce(fun)
      // window.debounce(updateUsersNotices);
      // не работает. при этом создается timeout, но не запускается.
      // потому ниже запускаю эту функцию
      window.debounce(updateUsersNotices)();
    }
  });

})();
