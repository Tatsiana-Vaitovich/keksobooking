"use strict";

(function() {

  // переменные и функции, используемые при работе с картой
  const mapFilter = document.querySelector(".map__filters");
  const mainPin = document.querySelector(".map__pin--main");
  const map = window.dom.map;
  const form = window.dom.form;
  const filters = window.dom.mapFilters;
  const bigMainPin = mainPin.querySelector("svg");
  const formAddress = document.querySelector("#address");

  const pageScrollX = window.pageXOffset;
  const pageScrollY = window.pageYOffset;
  const mainPinWidth = mainPin.offsetWidth;
  const bigMainPinWidth = bigMainPin.width.baseVal.value;
  const mapBoundingClientRect = window.dom.map.getBoundingClientRect();
  const mapLeft = mapBoundingClientRect.left + pageScrollX;
  const mapTop = mapBoundingClientRect.top + pageScrollY;
  const mapWidth = window.dom.map.offsetWidth;
  const mapHeight = window.dom.map.offsetHeight;
  const mapFilterHeight = mapFilter.offsetHeight;
  const mainPinBorder = (bigMainPinWidth - mainPinWidth) * 1 / 2;

  // fild = map
  // elem = mainPin

  // отцентрируем mainPin для всех устройств:
  function moveElemCenter(elem, fild) {
    const fildBoundingClientRect = fild.getBoundingClientRect();
    const elemWidth = elem.offsetWidth;
    elem.style.left = (fildBoundingClientRect.width / 2 - elemWidth / 2) + "px";
  }

  moveElemCenter(mainPin, map);

  let dragged = false;

  const OFFSET_COORDS_X = [
    "offsetLeft",
    "offsetWidth",
  ];

  const OFFSET_COORDS_Y = [
    "offsetTop",
    "offsetHeight",
  ];

  formAddress.value = getElemCoordStroke(mainPin);

  mainPin.addEventListener("mouseup", onElemActivatePage);

  function onElemActivatePage() {
    // получу elem1 фрагмента из данных, полученных с сервера
    // для этого нужно запустить функцию backend()
    // window.backend.backendXHRGeneral(window.backend.handleDateLoadingSuccess.onXhrDataLoadingSuccess, window.backend.handleDataLoadingErrors);
    // window.backend.backendFetch.load(window.backend.handleDateLoadingSuccess.onFethDataLoadingSuccess, window.backend.handleDataLoadingErrors);
    // window.backend.backendFetch.backendFetchGeneral(window.backend.handleDateLoadingSuccess.onFethDataLoadingSuccess, window.backend.handleDataLoadingErrors);
    // window.backend.backendFetch.backendPromiseGeneral(window.backend.handleDateLoadingSuccess.onFethDataLoadingSuccess, window.backend.handleDataLoadingErrors);
    window.backend.backendAxios.backendAxiosGeneral(window.backend.handleDateLoadingSuccess.onAxiosDataLoadingSuccess, window.backend.handleDataLoadingErrors);

    // Вставляю все полученные элементы из elem1 за один прием в блок ".map__pins"
    // window.util.insertChildrenAppend(window.createFragment.elem1, window.dom.mapPins);
    // активирую карту
    window.util.removeClass(map, "map--faded");
    window.util.removeClass(form, "ad-form--disabled");
    window.util.addClass(form, "ad-form--enebled");
    window.form.enebleForm(form);
    window.form.enebleForm(filters);

    mainPin.style.zIndex = "100";
  }

  mainPin.addEventListener("touchend", onElemActivatePage);

  function getElemCoord(elem) {
    const coord = elem[this[0]] + 1 / 2 * elem[this[1]];
    return coord;
  }

  function getElemCoordGeneral(coordName, elem) {
    const coords = (coordName === "x") ? OFFSET_COORDS_X : OFFSET_COORDS_Y;
    const coord = getElemCoord.call(coords, elem);
    return coord;
  }

  function getElemCoordStroke(elem) {
    return ((window.util.roundNumber(getElemCoordGeneral("x", elem), 10) + ", " + window.util.roundNumber(getElemCoordGeneral("y", elem), 10)));
  }

  window.dom.mapPins.addEventListener("mousedown", function(mouseDownevt) {
    mouseDownevt.preventDefault();
  });

  // чтобы не сработало браузерное событие drag_and_drop
  mainPin.addEventListener("dragstart", function() {
    return false;
  });

  // чтобы изначальный сдвиг курсора на элементе сохранялся запоминаем этот сдвиг:
  const elemCoordCapture = {};
  // также запомню координаты, где "остановились"
  const elemCoordDrop = {};

  // mainPin.addEventListener("mousedown", onMainPinMouseDown);
  mainPin.addEventListener("mousedown", onElemCursorStart);
  mainPin.addEventListener("touchstart", onElemCursorStart);

  // координаты "захвата" minPin
  let captureX;
  let captureY;

  function getCaptureCoord(objEvt, coordName) {
    const typeEvt = objEvt.type;
    let coord;
    const clientName = "client" + coordName.toUpperCase();
    if (typeEvt === "mousedown") {
      coord = objEvt[clientName];
    } else if (typeEvt === "touchstart") {
      coord = objEvt.touches[0][clientName];
    }
    return coord;
  }

  const mouseEvent = {
    "eventType": "mousedown",
    "eventStart": "mousemove",
    "eventEnd": "mouseup",
  };

  const touchEvent = {
    "eventType": "touchstart",
    "eventStart": "touchmove",
    "eventEnd": "touchend",
  };

  function listenEvent(objEvt) {
    let obj;
    const typeEvt = objEvt.type;
    if (typeEvt === "mousedown") {
      obj = mouseEvent;
    } else if (typeEvt === "touchstart") {
      obj = touchEvent;
    }
    captureX = getCaptureCoord.call(obj, objEvt, "x");
    captureY = getCaptureCoord.call(obj, objEvt, "y");
    window.dom.map.addEventListener(obj.eventStart, onMapCursorMove);
    window.dom.map.addEventListener(obj.eventEnd, onMapCursorEnd);
  }

  // if (cursorStartEvt.type === "mousedown") {
  //   captureX = cursorStartEvt.clientX;
  //   captureY = cursorStartEvt.clientY;
  //   window.dom.map.addEventListener("mousemove", onMapCursorMove);
  //   window.dom.map.addEventListener("mouseup", onMapCursorEnd);
  // } else if (cursorStartEvt.type === "touchstart") {
  //   captureX = cursorStartEvt.touches[0].clientX;
  //   captureY = cursorStartEvt.touches[0].clientY;
  //   window.dom.map.addEventListener("touchmove", onMapCursorMove);
  //   window.dom.map.addEventListener("touchend", onMapCursorEnd);
  // }


  function onElemCursorStart(cursorStartEvt) {
    cursorStartEvt.preventDefault();

    listenEvent(cursorStartEvt);
    getCaptureCoords(captureX, captureY);
  }

  // если mainPin не перетаскивался - в поле адреса будут записаны начальные
  // координаты, если перетаскивался - новые координаты:
  if (dragged) {
    mainPin.removeEventListener("click", onElemClick);
  } else {
    mainPin.addEventListener("click", onElemClick);
  }

  function onElemClick() {
    formAddress.value = getElemCoordStroke(mainPin);
  }

  function getCaptureCoords(captureX, captureY) {
    const elemBoundingClientRect = mainPin.getBoundingClientRect();
    const elemLeft = elemBoundingClientRect.left;
    const elemTop = elemBoundingClientRect.top;

    elemCoordCapture.x = captureX - elemLeft;
    elemCoordCapture.y = captureY - elemTop;
  }

  function onMapCursorMove(cursorMoveEvt) {
    dragged = true;
    let newX;
    let newY;
    if (cursorMoveEvt.type === "mousemove") {
      newX = cursorMoveEvt.clientX;
      newY = cursorMoveEvt.clientY;
    } else if (cursorMoveEvt.type === "touchmove") {
      newX = cursorMoveEvt.touches[0].clientX;
      newY = cursorMoveEvt.touches[0].clientY;
    }
    getNewCoords(newX, newY);
  }

  function getNewCoords(newX, newY) {
    // на протяжении всего перетаскивания нужно следить за тем,
    // чтобы метка не вышла за пределы карты
    const pageScrollX = window.pageXOffset;
    const pageScrollY = window.pageYOffset;

    let newLeft = newX + pageScrollX - mapLeft - elemCoordCapture.x;
    let newTop = newY + pageScrollY - mapTop - elemCoordCapture.y;

    const minLeft = mainPinBorder + pageScrollX;
    const maxLeft = mapWidth - window.data.mapPinWidth - mainPinBorder + pageScrollX;
    const minTop = mainPinBorder + pageScrollY;
    const maxTop = mapHeight - window.data.mapPinHeight - mainPinBorder - mapFilterHeight;
    // mapPin вышла из map => оставить mapPin в еe границах.
    if (newLeft < minLeft) {
      newLeft = minLeft;
    } else if (newLeft > maxLeft) {
      newLeft = maxLeft;
    }
    if (newTop < minTop) {
      newTop = minTop;
    } else if (newTop > maxTop) {
      newTop = maxTop;
    }
    mainPin.style.top = newTop + "px";
    mainPin.style.left = newLeft + "px";
    elemCoordDrop.x = newLeft;
    elemCoordDrop.y = newTop;
  }

  function onMapCursorEnd(cursorEndEvt) {
    let newLeft;
    let newTop;
    if (cursorEndEvt.type === "mouseup") {
      newLeft = elemCoordDrop.x;
      newTop = elemCoordDrop.y;
      mainPin.style.top = newTop + "px";
      mainPin.style.left = newLeft + "px";

      window.dom.map.removeEventListener("mousemove", onMapCursorMove);
      window.dom.map.removeEventListener("mouseup", onMapCursorEnd);
    } else if (cursorEndEvt.type === "touchend") {
      const elemBoundingClientRect = mainPin.getBoundingClientRect();
      const elemLeft = elemBoundingClientRect.left;
      const elemTop = elemBoundingClientRect.top;
      const mapBoundingClientRect = window.dom.map.getBoundingClientRect();
      const mapLeft = mapBoundingClientRect.left;
      const mapTop = mapBoundingClientRect.top;
      newLeft = elemLeft - mapLeft;
      newTop = elemTop - mapTop;

      window.dom.map.removeEventListener("touchend", onMapCursorEnd);
      window.dom.map.removeEventListener("touchmove", onMapCursorMove);
    }
    // заполним поле адреса
    fillFormAddress(newLeft, newTop);
  }

  function fillFormAddress(newLeft, newTop) {
    const roundValueX = window.util.roundNumber((newLeft), 1);
    const roundValueY = window.util.roundNumber((newTop), 1);
    formAddress.value = roundValueX + ", " + roundValueY;
  }
})();
