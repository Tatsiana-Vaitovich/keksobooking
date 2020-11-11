"use strict";

// данные (объекты и const), которые используются в разных модулях

(function() {

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
  // const minPriceArr = {
  //   bungalo: 0,
  //   flat: 1000,
  //   house: 5000,
  //   palace: 10000,
  // };

  const minPrice = 1000;
  const maxPrice = 1000000;
  const minRooms = 1;
  const maxRooms = 5;
  const minGuests = 1;
  const maxGuests = 15;
  const avatarsArr = window.getMyMock.getAvatars(1, 8);
  // const mapPinWidth = 50;
  // const mapPinHeight = 70;

  window.getMyMock.data = {
    "titlesArr": titlesArr,
    "typesArr": typesArr,
    "checkinsArr": checkinsArr,
    "checkoutsArr": checkoutsArr,
    "photosArr": photosArr,
    "featuresArr": featuresArr,
    "minPrice": minPrice,
    "maxPrice": maxPrice,
    "minGuests": minGuests,
    "maxGuests": maxGuests,
    "minRooms": minRooms,
    "maxRooms": maxRooms,
    "avatarsArr": avatarsArr,
  };
})();
