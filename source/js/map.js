"use strict";

(function() {

  // переменные и функции, используемые при работе с картой
  const mapFilter = document.querySelector(".map__filters");
  const mainPin = document.querySelector(".map__pin--main");
  const bigMainPin = mainPin.querySelector("svg");
  const formAddress = document.querySelector("#address");

  let dragged = false;

  formAddress.value = getMainPinCoordStroke();

  mainPin.addEventListener("mouseup", onMainPinActivatePage);

  function onMainPinActivatePage() {
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
    window.util.removeClass(window.dom.map, "map--faded");
    window.util.removeClass(window.dom.form, "ad-form--disabled");
    window.util.addClass(window.dom.form, "ad-form--enebled");
    window.form.enebleForm(window.dom.form);
    window.form.enebleForm(window.dom.mapFilters);

    mainPin.style.zIndex = "100";
  }

  mainPin.addEventListener("touchend", onMainPinActivatePage);

  function getMainPinCoord(coordName) {
    let coord;
    if (coordName === "x") {
      coord = mainPin.offsetLeft + (1 / 2 * mainPin.offsetWidth);
    } else {
      coord = mainPin.offsetTop + (1 / 2 * mainPin.offsetHeight);
    }
    return coord;
  }

  function getMainPinCoordStroke() {
    return ((window.util.roundNumber(getMainPinCoord("x"), 10) + ", " + window.util.roundNumber(getMainPinCoord("y"), 10)));
  }

  window.dom.mapPins.addEventListener("mousedown", function(mouseDownevt) {
    mouseDownevt.preventDefault();
  });

  // чтобы не сработало браузерное событие drag_and_drop
  mainPin.addEventListener("dragstart", function() {
    return false;
  });

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

  // чтобы изначальный сдвиг курсора на элементе сохранялся запоминаем этот сдвиг:
  const mainPinCoordCapture = {};
  // также запомню координаты, где "остановились"
  const mainPinCoordDrop = {};

  // mainPin.addEventListener("mousedown", onMainPinMouseDown);
  mainPin.addEventListener("mousedown", onMainPinCursorStart);
  mainPin.addEventListener("touchstart", onMainPinCursorStart);

  function onMainPinCursorStart(cursorStartEvt) {
    cursorStartEvt.preventDefault();

    let captureX;
    let captureY;

    if (cursorStartEvt.type === "mousedown") {
      captureX = cursorStartEvt.clientX;
      captureY = cursorStartEvt.clientY;
      window.dom.map.addEventListener("mousemove", onMapCursorMove);
      window.dom.map.addEventListener("mouseup", onMapCursorEnd);
    } else if (cursorStartEvt.type === "touchstart") {
      captureX = cursorStartEvt.touches[0].clientX;
      captureY = cursorStartEvt.touches[0].clientY;
      window.dom.map.addEventListener("touchmove", onMapCursorMove);
      window.dom.map.addEventListener("touchend", onMapCursorEnd);
    }

    getCaptureCoords(captureX, captureY);
  }

  // если mainPin не перетаскивался - в поле адреса будут записаны начальные
  // координаты, если перетаскивался - новые координаты:
  if (dragged) {
    mainPin.removeEventListener("click", onMainPinClick);
  } else {
    mainPin.addEventListener("click", onMainPinClick);
  }

  function onMainPinClick() {
    formAddress.value = getMainPinCoordStroke();
  }

  function getCaptureCoords(captureX, captureY) {
    const mainPinBoundingClientRect = mainPin.getBoundingClientRect();
    const mainPinLeft = mainPinBoundingClientRect.left;
    const mainPinTop = mainPinBoundingClientRect.top;

    mainPinCoordCapture.x = captureX - mainPinLeft;
    mainPinCoordCapture.y = captureY - mainPinTop;
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

    let newLeft = newX + pageScrollX - mapLeft - mainPinCoordCapture.x;
    let newTop = newY + pageScrollY - mapTop - mainPinCoordCapture.y;

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
    mainPinCoordDrop.x = newLeft;
    mainPinCoordDrop.y = newTop;
  }

  function onMapCursorEnd(cursorEndEvt) {
    let newLeft;
    let newTop;
    if (cursorEndEvt.type === "mouseup") {
      newLeft = mainPinCoordDrop.x;
      newTop = mainPinCoordDrop.y;
      mainPin.style.top = newTop + "px";
      mainPin.style.left = newLeft + "px";

      window.dom.map.removeEventListener("mousemove", onMapCursorMove);
      window.dom.map.removeEventListener("mouseup", onMapCursorEnd);
    } else if (cursorEndEvt.type === "touchend") {
      const mainPinBoundingClientRect = mainPin.getBoundingClientRect();
      const mainPinLeft = mainPinBoundingClientRect.left;
      const mainPinTop = mainPinBoundingClientRect.top;
      const mapBoundingClientRect = window.dom.map.getBoundingClientRect();
      const mapLeft = mapBoundingClientRect.left;
      const mapTop = mapBoundingClientRect.top;
      newLeft = mainPinLeft - mapLeft;
      newTop = mainPinTop - mapTop;

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
