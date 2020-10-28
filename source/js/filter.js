"use strict";

// фильтрую отрисованные на карте метки с помощью
// фильтров в .map__filters

(function() {

  // не забыть вынести эту функцию в отдельный модуль
  // она используется в backupMethodForLoadingData и здесь
  function updateUsersNotices(data) {
    window.data.usersNotices = data;
    window.backupMethodForLoadingData.getMapPins();
  }

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

    // словарь для price
    const valueToHousingPrice = {
      "middle": {"min": 10000, "max": 50000},
      "low": {"max": 10000},
      "high": {"min": 50000},
    };

    if (housingType.value === userNotice.offer.type) {
      rank++;
    }
    if (housingPrice.value === "middle") {
      if (valueToHousingPrice[housingPrice.value].min <= userNotice.offer.price && valueToHousingPrice[housingPrice.value].max > userNotice.offer.price) {
        console.log("min " + valueToHousingPrice[housingPrice.value].min);
        console.log("max " + valueToHousingPrice[housingPrice.value].max);
        console.log("userNotice.offer.price " + userNotice.offer.price);
        rank++;
      }
    } else if (housingPrice.value === "high") {
      if (valueToHousingPrice[housingPrice.value].min <= userNotice.offer.price) {
        console.log("min " + valueToHousingPrice[housingPrice.value].min);
        console.log("userNotice.offer.price " + userNotice.offer.price);
        rank++;
      }
    } else if (housingPrice.value === "low") {
      if (valueToHousingPrice[housingPrice.value].max > userNotice.offer.price) {
        console.log("max " + valueToHousingPrice[housingPrice.value].max);
        console.log("userNotice.offer.price " + userNotice.offer.price);
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
    console.log(userNotice);
    console.log("rank=" + rank);
    return rank;
  }

  // window.data.usersNotices.forEach(function(elem) {
  //   console.log(elem);
  //   getRank(elem);
  // });

  // отсортируем массив usersNotices по рейтингу
  // соответствия запросу пользователя
  // для сортировки использую sort();
  // т.к метод sort() деструктивный,
  // результат сохраню в виде дубликата массива

  // const newUsersNotices = window.data.usersNotices.sort(function(first, second) {

  // });

  window.filter = {
    "getRank": getRank,
  };

})();
