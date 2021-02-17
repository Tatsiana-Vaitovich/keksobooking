"use strict";

(function() {

  let dragged = false;
  // чтобы изначальный сдвиг курсора на элементе сохранялся запоминаем этот сдвиг:
  const elemCoordCapture = {};
  // также запомню координаты, где "остановились"
  const elemCoordDrop = {};

  let captureX;
  let captureY;

  function slider(elem, fild, callback) {

    // elem.addEventListener("mousedown", onMainPinMouseDown);
    elem.addEventListener("mousedown", onElemCursorStart);
    elem.addEventListener("touchstart", onElemCursorStart);

    // ----------функции для onElemCursorStart
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

    function listenEvent(objEvt) {
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

      let obj;
      const typeEvt = objEvt.type;
      if (typeEvt === "mousedown") {
        obj = mouseEvent;
      } else if (typeEvt === "touchstart") {
        obj = touchEvent;
      }
      captureX = getCaptureCoord.call(obj, objEvt, "x");
      captureY = getCaptureCoord.call(obj, objEvt, "y");
      fild.addEventListener(obj.eventStart, onFildCursorMove);
      fild.addEventListener(obj.eventEnd, onFildCursorEnd);
    }

    function onElemCursorStart(cursorStartEvt) {
      cursorStartEvt.preventDefault();

      listenEvent(cursorStartEvt);
      getCaptureCoords(captureX, captureY);
    }

    function getCaptureCoords(captureX, captureY) {
      const elemBoundingClientRect = elem.getBoundingClientRect();
      const elemLeft = elemBoundingClientRect.left;
      const elemTop = elemBoundingClientRect.top;

      elemCoordCapture.x = captureX - elemLeft;
      elemCoordCapture.y = captureY - elemTop;
    }

    // -----функции для onFildCursorMove()
    function onFildCursorMove(cursorMoveEvt) {
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
      const fildBoundingClientRect = fild.getBoundingClientRect();
      const fildLeft = fildBoundingClientRect.left + pageScrollX;
      const fildTop = fildBoundingClientRect.top + pageScrollY;

      let newLeft = newX + pageScrollX - fildLeft - elemCoordCapture.x;
      let newTop = newY + pageScrollY - fildTop - elemCoordCapture.y;

      let minMaxSizes = {};
      minMaxSizes = getMinMaxElemSizes(elem);
      if (newLeft < minMaxSizes.minLeft) {
        newLeft = minMaxSizes.minLeft;
      } else if (newLeft > minMaxSizes.maxLeft) {
        newLeft = minMaxSizes.maxLeft;
      }
      if (newTop < minMaxSizes.minTop) {
        newTop = minMaxSizes.minTop;
      } else if (newTop > minMaxSizes.maxTop) {
        newTop = minMaxSizes.maxTop;
      }
      elem.style.top = newTop + "px";
      elem.style.left = newLeft + "px";
      elemCoordDrop.x = newLeft;
      elemCoordDrop.y = newTop;
    }

    function getElemBorder(elem) {
      const bigElem = elem.querySelector("svg");
      const elemWidth = elem.offsetWidth;
      const bigElemWidth = bigElem.width.baseVal.value;
      const elemBorder = (bigElemWidth - elemWidth) * 1 / 2;
      return (elemBorder);
    }

    function getMinMaxElemSizes(elem) {

      const mapFilter = document.querySelector(".map__filters");

      const pageScrollX = window.pageXOffset;
      const pageScrollY = window.pageYOffset;
      const fildWidth = fild.offsetWidth;
      const fildHeight = fild.offsetHeight;
      const fildFilterHeight = mapFilter.offsetHeight;

      const elemWidth = window.data.mapPinWidth;
      const elemHeight = window.data.mapPinHeight;

      const elemBorder = getElemBorder(elem);

      const minMaxSizes = {};

      minMaxSizes.minLeft = elemBorder + pageScrollX;
      minMaxSizes.maxLeft = fildWidth - elemWidth - elemBorder + pageScrollX;
      minMaxSizes.minTop = elemBorder + pageScrollY;
      minMaxSizes.maxTop = fildHeight - elemHeight - elemBorder - fildFilterHeight;
      return (minMaxSizes);
    }

    // -------------onFildCursorEnd
    function onFildCursorEnd(cursorEndEvt) {
      let newLeft;
      let newTop;
      if (cursorEndEvt.type === "mouseup") {
        newLeft = elemCoordDrop.x;
        newTop = elemCoordDrop.y;
        elem.style.top = newTop + "px";
        elem.style.left = newLeft + "px";

        fild.removeEventListener("mousemove", onFildCursorMove);
        fild.removeEventListener("mouseup", onFildCursorEnd);
      } else if (cursorEndEvt.type === "touchend") {
        const elemBoundingClientRect = elem.getBoundingClientRect();
        const elemLeft = elemBoundingClientRect.left;
        const elemTop = elemBoundingClientRect.top;
        const fildBoundingClientRect = fild.getBoundingClientRect();
        const fildLeft = fildBoundingClientRect.left;
        const fildTop = fildBoundingClientRect.top;
        newLeft = elemLeft - fildLeft;
        newTop = elemTop - fildTop;

        fild.removeEventListener("touchend", onMapCursorEnd);
        fild.removeEventListener("touchmove", onMapCursorMove);
      }
      // заполним поле адреса
      callback(newLeft, newTop, dragged);
    }
  }

  window.slider = slider;
})();
