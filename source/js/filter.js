"use strict";

// фильтрую отрисованные на карте метки с помощью
// фильтров в .map__filters

(function() {

  // не забыть вынести эту функцию в отдельный модуль
  // она используется в backupMethodForLoadingData и здесь
  function updateUsersNotices() {
    const data = window.data.usersNotices;
    window.usersNotice.showMapPins(data);
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
      if (valueToHousingPrice[housingPrice.value].min > userNotice.offer.price) {
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
    console.log(userNotice.offer);
    console.log("rank=" + rank);
    return rank;
  }

  // похожие объявления будут отрисовываться после изменения выбора в полях
  // формы map__filters. для регистрации этих изменений использую событие change

  window.dom.mapFilters.addEventListener("change", onMapFiltersChange);

  function onMapFiltersChange(changeEvt) {
    const elem = changeEvt.target;
    if (elem.closest("select") || elem.closest("input")) {
      console.log("----");
      window.data.usersNotices.forEach(function(elem) {
        getRank(elem);
      });
    }
  }

  // отсортируем массив usersNotices по рейтингу
  // соответствия запросу пользователя
  // для сортировки использую sort();
  // т.к метод sort() деструктивный,
  // результат сохраню в виде дубликата массива

  const newUsersNotices = window.data.usersNotices.sort(compareRankOfUsersNotices);
  // по умолчанию сортирует как "stroke";
  // чтобы сравнивались числа напишем функцию
  function compareRankOfUsersNotices(first, second) {
    if ((first - second) < 0) {
      return (-1);
    } else if ((first - second) > 0) {
      return (1);
    } else {
      return (0);
    }
  }

  window.filter = {
    "getRank": getRank,
  };

})();
