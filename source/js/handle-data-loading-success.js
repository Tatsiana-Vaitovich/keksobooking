"use strict";

// функция, которая запустится при успешной загрузке данных с сервера

(function() {

  function onLoad(data) {
    console.log(data);
    window.getMapPins(data, window.createFragment.elem1);
  }

  window.handleDateLoadingSuccess = onLoad;
})();
