"use strict";

(function() {
  function getPopup(number) {
    const popup = window.createFragment.template.querySelector(".map__card").cloneNode(true);
    const userNotice = window.data.usersNotices[number];
    const capacity = getStrokeCapacity(number);
    const time = getStrokeTime(number);
    const whereInsertFeatures = popup.querySelector(".popup__features");
    const whereInsertPhotos = popup.querySelector(".popup__photos");
    popup.querySelector(".popup__avatar").src = userNotice.author.avatar;
    popup.querySelector(".popup__title").textContent = userNotice.offer.title;
    popup.querySelector(".popup__text--address").textContent = userNotice.offer.address;
    popup.querySelector(".popup__text--price").innerHTML = getStrokePrice(number);
    popup.querySelector(".popup__type").textContent = getStrokeType(number);
    popup.querySelector(".popup__text--capacity").textContent = capacity;
    popup.querySelector(".popup__text--time").textContent = time;
    popup.querySelector(".popup__description").textContent = userNotice.offer.description;
    window.util.clear(popup, ".popup__features");
    getElemFeatures(userNotice.offer.features, whereInsertFeatures);
    window.util.clear(popup, ".popup__photos");

    // получим elem2 фрагмента
    getPopupPhotos(userNotice.offer.photos);

    // вставим содержимое elem2 в элемент с классом popup__photos
    window.util.insertChildrenAppend(window.createFragment.elem2, whereInsertPhotos);

    return popup;
  }

  // функция для получения строки price
  function getStrokePrice(number) {
    const priceFromUserNotice = window.util.roundNumber(window.data.usersNotices[number].offer.price, 1000);
    const addStroke = "&#x20bd;<span>/ночь</span>";
    return (priceFromUserNotice + addStroke);
  }

  // функция для получения строки type
  function getStrokeType(number) {
    const typeFromUserNotice = window.data.usersNotices[number].offer.type;
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
    const roomsFromUserNotice = window.data.usersNotices[number].offer.rooms;
    const guestsFromUserNotice = window.data.usersNotices[number].offer.guests;
    const capacity = roomsFromUserNotice + " комнаты для " + guestsFromUserNotice + " гостей";
    return capacity;
  }

  function getStrokeTime(number) {
    const checkinFromUserNotice = window.data.usersNotices[number].offer.checkin;
    const checkoutFromUserNotice = window.data.usersNotices[number].offer.checkout;
    const time = "Заезд после " + checkinFromUserNotice + ", выезд до " + checkoutFromUserNotice;
    return time;
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
      const popupPhoto = window.createFragment.template.querySelector(".popup__photo").cloneNode(true);
      popupPhoto.src = arr[elem];
      window.createFragment.elem2.append(popupPhoto);
    }
    return window.createFragment.elem2;
  }

  window.dom.map.addEventListener("click", onMapPopupOpen);

  let lastElementInFocus;

  function onMapPopupOpen(clickEvt) {
    const elem = clickEvt.target;
    if ((elem.closest(".map__pin")) && !(elem.closest(".map__pin--main"))) {
      if (!document.querySelector(".popup")) {
        lastElementInFocus = elem.closest(".map__pin");
        const index = getIndex(lastElementInFocus);
        openPopup(index);
        document.querySelector(".popup__close").focus();
      } else {
        closePopup();
      }
    } else if (elem.closest(".popup__close")) {
      closePopup();
      lastElementInFocus.focus();
    }
  }

  function getIndex(elem) {
    const MapPinsCollection = window.dom.mapPins.querySelectorAll(".map__pin");
    const mapPinsArr = Array.from(MapPinsCollection);
    const index = (mapPinsArr.indexOf(elem));
    // т.к полученный массив содержит и map__pin--main,
    // для получения индекса кнопки нужно вычесть 1:
    return (index - 1);
  }

  function openPopup(index) {
    const mapFilters = document.querySelector(".map__filters-container");
    window.createFragment.elem3.append(getPopup(index));
    window.util.insertChildrenBefore(window.createFragment.elem3, mapFilters);

    document.addEventListener("keydown", onPopupEnterOREscPress);
  }

  function closePopup() {
    const popup = window.dom.map.querySelector(".popup");
    popup.parentElement.removeChild(popup);

    lastElementInFocus.focus();

    document.removeEventListener("keydown", onPopupEnterOREscPress);
  }

  // для доступности добавлю keyEvents, чтобы можно было закрыть popup
  // нажав кнопку esc на документе или нажав кнопку Enter на самом элементе buttonClose

  // обработчик "закрыть/открыть с клавиатур popup"
  function onPopupEnterOREscPress(keyEvt) {
    switch (keyEvt.keyCode) {
      case window.util.KEY_CODE_ENTER:
        if (!document.querySelector(".popup")) {
          openPopup();
        } break;
      case window.util.KEY_CODE_ESC:
        closePopup();
    }
  }
})();
