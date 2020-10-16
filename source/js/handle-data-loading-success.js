"use strict";

// функция, которая запустится при успешной загрузке данных с сервера

(function() {

  function onXhrDataLoadingSuccess(data) {
    window.usersNotice.getMapPins(data, window.createFragment.elem1, 8);
  }

  window.handleDateLoadingSuccess = onXhrDataLoadingSuccess;
})();
