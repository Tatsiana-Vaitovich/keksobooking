"use strict";

(function() {

  // переменные и функции, используемые при работе с картой
  // fild = map
  // mapPin = elem

  // const mapFilter = document.querySelector(".map__filters");
  const elem = document.querySelector(".map__pin--main");
  const fild = window.dom.map;
  const form = window.dom.form;
  const filters = window.dom.mapFilters;
  const formAddress = document.querySelector("#address");


  // отцентрируем elem для всех устройств:
  function moveElemCenter(elem, fild) {
    const fildBoundingClientRect = fild.getBoundingClientRect();
    const elemWidth = elem.offsetWidth;
    elem.style.left = (fildBoundingClientRect.width / 2 - elemWidth / 2) + "px";
  }

  moveElemCenter(elem, fild);

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

  window.dom.mapPins.addEventListener("mousedown", function(mouseDownevt) {
    mouseDownevt.preventDefault();
  });

  function getElemCoord(elem) {
    const coord = elem[this[0]] + 1 / 2 * elem[this[1]];
    return coord;
  }

  function getElemCoordGeneral(coordName, elem) {
    const OFFSET_COORDS_X = [
      "offsetLeft",
      "offsetWidth",
    ];

    const OFFSET_COORDS_Y = [
      "offsetTop",
      "offsetHeight",
    ];

    const coords = (coordName === "x") ? OFFSET_COORDS_X : OFFSET_COORDS_Y;
    const coord = getElemCoord.call(coords, elem);
    return coord;
  }

  function getElemCoordStroke(elem) {
    return ((window.util.roundNumber(getElemCoordGeneral("x", elem), 10) + ", " + window.util.roundNumber(getElemCoordGeneral("y", elem), 10)));
  }

  function onElemClick() {
    formAddress.value = getElemCoordStroke(elem);
  }

  function fillFormAddress(newLeft, newTop, dragged) {
    const roundValueX = window.util.roundNumber((newLeft), 1);
    const roundValueY = window.util.roundNumber((newTop), 1);
    formAddress.value = roundValueX + ", " + roundValueY;

    if (dragged) {
      elem.removeEventListener("click", onElemClick);
    } else {
      elem.addEventListener("click", onElemClick);
    }
  }

  window.dom.mapPins.addEventListener("mousedown", function(mouseDownevt) {
    mouseDownevt.preventDefault();
  });

  // чтобы не сработало браузерное событие drag_and_drop
  elem.addEventListener("dragstart", function() {
    return false;
  });

  //  slider() - перемещение elem по fild; callback - конечные координаты записываются в formAddress
  window.slider(elem, fild, fillFormAddress);

})();
