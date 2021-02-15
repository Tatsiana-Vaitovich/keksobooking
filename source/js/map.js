"use strict";

(function() {

  // переменные и функции, используемые при работе с картой
  // fild = map
  // mapPin = elem

  const mapFilter = document.querySelector(".map__filters");
  const elem = document.querySelector(".map__pin--main");
  const fild = window.dom.map;
  const form = window.dom.form;
  const filters = window.dom.mapFilters;
  const formAddress = document.querySelector("#address");

  const pageScrollX = window.pageXOffset;
  const pageScrollY = window.pageYOffset;

  const fildBoundingClientRect = fild.getBoundingClientRect();
  const fildLeft = fildBoundingClientRect.left + pageScrollX;
  const fildTop = fildBoundingClientRect.top + pageScrollY;
  const fildWidth = fild.offsetWidth;
  const fildHeight = fild.offsetHeight;
  const fildFilterHeight = mapFilter.offsetHeight;

  const elemWidth = window.data.mapPinWidth;
  const elemHeight = window.data.mapPinHeight;

  function getElemBorder(elem) {
    const bigElem = elem.querySelector("svg");
    const elemWidth = elem.offsetWidth;
    const bigElemWidth = bigElem.width.baseVal.value;
    const elemBorder = (bigElemWidth - elemWidth) * 1 / 2;
    return (elemBorder);
  }

  function getMinMaxElemSizes(elem) {

    const elemBorder = getElemBorder(elem);

    const minMaxSizes = {};

    minMaxSizes.minLeft = elemBorder + pageScrollX;
    minMaxSizes.maxLeft = fildWidth - elemWidth - elemBorder + pageScrollX;
    minMaxSizes.minTop = elemBorder + pageScrollY;
    minMaxSizes.maxTop = fildHeight - elemHeight - elemBorder - fildFilterHeight;
    return (minMaxSizes);
  }

  // отцентрируем elem для всех устройств:
  function moveElemCenter(elem, fild) {
    const fildBoundingClientRect = fild.getBoundingClientRect();
    const elemWidth = elem.offsetWidth;
    elem.style.left = (fildBoundingClientRect.width / 2 - elemWidth / 2) + "px";
  }

  moveElemCenter(elem, fild);

  let dragged = false;

  const OFFSET_COORDS_X = [
    "offsetLeft",
    "offsetWidth",
  ];

  const OFFSET_COORDS_Y = [
    "offsetTop",
    "offsetHeight",
  ];

  formAddress.value = getElemCoordStroke(elem);

  elem.addEventListener("mouseup", onElemActivatePage);
  elem.addEventListener("touchend", onElemActivatePage);

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
    window.util.removeClass(fild, "map--faded");
    window.util.removeClass(form, "ad-form--disabled");
    window.util.addClass(form, "ad-form--enebled");
    window.form.enebleForm(form);
    window.form.enebleForm(filters);

    elem.style.zIndex = "100";
  }

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
  elem.addEventListener("dragstart", function() {
    return false;
  });

  // function slider(elem, fild, callback) {

  //   // чтобы изначальный сдвиг курсора на элементе сохранялся запоминаем этот сдвиг:
  //   const elemCoordCapture = {};
  //   // также запомню координаты, где "остановились"
  //   const elemCoordDrop = {};

  //   // elem.addEventListener("mousedown", onMainPinMouseDown);
  //   elem.addEventListener("mousedown", onElemCursorStart);
  //   elem.addEventListener("touchstart", onElemCursorStart);

  //   // координаты "захвата" minPin
  //   let captureX;
  //   let captureY;

  //   function getCaptureCoord(objEvt, coordName) {
  //     const typeEvt = objEvt.type;
  //     let coord;
  //     const clientName = "client" + coordName.toUpperCase();
  //     if (typeEvt === "mousedown") {
  //       coord = objEvt[clientName];
  //     } else if (typeEvt === "touchstart") {
  //       coord = objEvt.touches[0][clientName];
  //     }
  //     return coord;
  //   }

  //   const mouseEvent = {
  //     "eventType": "mousedown",
  //     "eventStart": "mousemove",
  //     "eventEnd": "mouseup",
  //   };

  //   const touchEvent = {
  //     "eventType": "touchstart",
  //     "eventStart": "touchmove",
  //     "eventEnd": "touchend",
  //   };

  //   function listenEvent(objEvt) {
  //     let obj;
  //     const typeEvt = objEvt.type;
  //     if (typeEvt === "mousedown") {
  //       obj = mouseEvent;
  //     } else if (typeEvt === "touchstart") {
  //       obj = touchEvent;
  //     }
  //     captureX = getCaptureCoord.call(obj, objEvt, "x");
  //     captureY = getCaptureCoord.call(obj, objEvt, "y");
  //     fild.addEventListener(obj.eventStart, onFildCursorMove);
  //     fild.addEventListener(obj.eventEnd, onFildCursorEnd);
  //   }

  //   // if (cursorStartEvt.type === "mousedown") {
  //   //   captureX = cursorStartEvt.clientX;
  //   //   captureY = cursorStartEvt.clientY;
  //   //   window.dom.map.addEventListener("mousemove", onMapCursorMove);
  //   //   window.dom.map.addEventListener("mouseup", onMapCursorEnd);
  //   // } else if (cursorStartEvt.type === "touchstart") {
  //   //   captureX = cursorStartEvt.touches[0].clientX;
  //   //   captureY = cursorStartEvt.touches[0].clientY;
  //   //   window.dom.map.addEventListener("touchmove", onMapCursorMove);
  //   //   window.dom.map.addEventListener("touchend", onMapCursorEnd);
  //   // }


  //   function onElemCursorStart(cursorStartEvt) {
  //     cursorStartEvt.preventDefault();

  //     listenEvent(cursorStartEvt);
  //     getCaptureCoords(captureX, captureY);
  //   }

  //   // если elem не перетаскивался - в поле адреса будут записаны начальные
  //   // координаты, если перетаскивался - новые координаты:
  //   // if (dragged) {
  //   //   elem.removeEventListener("click", onElemClick);
  //   // } else {
  //   //   elem.addEventListener("click", onElemClick);
  //   // }

  //   // function onElemClick() {
  //   //   formAddress.value = getElemCoordStroke(elem);
  //   // }

  //   function getCaptureCoords(captureX, captureY) {
  //     const elemBoundingClientRect = elem.getBoundingClientRect();
  //     const elemLeft = elemBoundingClientRect.left;
  //     const elemTop = elemBoundingClientRect.top;

  //     elemCoordCapture.x = captureX - elemLeft;
  //     elemCoordCapture.y = captureY - elemTop;
  //   }

  //   function onFildCursorMove(cursorMoveEvt) {
  //     dragged = true;
  //     let newX;
  //     let newY;
  //     if (cursorMoveEvt.type === "mousemove") {
  //       newX = cursorMoveEvt.clientX;
  //       newY = cursorMoveEvt.clientY;
  //     } else if (cursorMoveEvt.type === "touchmove") {
  //       newX = cursorMoveEvt.touches[0].clientX;
  //       newY = cursorMoveEvt.touches[0].clientY;
  //     }
  //     getNewCoords(newX, newY);
  //   }

  //   function getNewCoords(newX, newY) {
  //     // на протяжении всего перетаскивания нужно следить за тем,
  //     // чтобы метка не вышла за пределы карты
  //     const pageScrollX = window.pageXOffset;
  //     const pageScrollY = window.pageYOffset;

  //     let newLeft = newX + pageScrollX - fildLeft - elemCoordCapture.x;
  //     let newTop = newY + pageScrollY - fildTop - elemCoordCapture.y;

  //     let minMaxSizes = {};
  //     minMaxSizes = getMinMaxElemSizes(elem);
  //     if (newLeft < minMaxSizes.minLeft) {
  //       newLeft = minMaxSizes.minLeft;
  //     } else if (newLeft > minMaxSizes.maxLeft) {
  //       newLeft = minMaxSizes.maxLeft;
  //     }
  //     if (newTop < minMaxSizes.minTop) {
  //       newTop = minMaxSizes.minTop;
  //     } else if (newTop > minMaxSizes.maxTop) {
  //       newTop = minMaxSizes.maxTop;
  //     }
  //     elem.style.top = newTop + "px";
  //     elem.style.left = newLeft + "px";
  //     elemCoordDrop.x = newLeft;
  //     elemCoordDrop.y = newTop;
  //   }

  //   function onFildCursorEnd(cursorEndEvt) {
  //     let newLeft;
  //     let newTop;
  //     if (cursorEndEvt.type === "mouseup") {
  //       newLeft = elemCoordDrop.x;
  //       newTop = elemCoordDrop.y;
  //       elem.style.top = newTop + "px";
  //       elem.style.left = newLeft + "px";

  //       fild.removeEventListener("mousemove", onFildCursorMove);
  //       fild.removeEventListener("mouseup", onFildCursorEnd);
  //     } else if (cursorEndEvt.type === "touchend") {
  //       const elemBoundingClientRect = elem.getBoundingClientRect();
  //       const elemLeft = elemBoundingClientRect.left;
  //       const elemTop = elemBoundingClientRect.top;
  //       const fildBoundingClientRect = fild.getBoundingClientRect();
  //       const fildLeft = fildBoundingClientRect.left;
  //       const fildTop = fildBoundingClientRect.top;
  //       newLeft = elemLeft - fildLeft;
  //       newTop = elemTop - fildTop;

  //       fild.removeEventListener("touchend", onMapCursorEnd);
  //       fild.removeEventListener("touchmove", onMapCursorMove);
  //     }
  //     // заполним поле адреса
  //     callback(newLeft, newTop);
  //   }
  // }

  slider(elem, fild, fillFormAddress);

  if (dragged) {
    elem.removeEventListener("click", onElemClick);
  } else {
    elem.addEventListener("click", onElemClick);
  }

  function onElemClick() {
    formAddress.value = getElemCoordStroke(elem);
  }

  function fillFormAddress(newLeft, newTop) {
    const roundValueX = window.util.roundNumber((newLeft), 1);
    const roundValueY = window.util.roundNumber((newTop), 1);
    formAddress.value = roundValueX + ", " + roundValueY;
  }
})();
