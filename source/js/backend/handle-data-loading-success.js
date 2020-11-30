"use strict";

// функция, которая запустится при успешной загрузке данных с сервера

(function() {

  function onXhrDataLoadingSuccess(data) {
    window.data.usersNoticesOrigin = data;
    window.data.usersNotice = window.data.usersNoticesOrigin.slice();
    window.usersNotice.showMapPins(window.data.usersNotice);
  }

  window.backend.handleDateLoadingSuccess = {
    "handleDateLoadingSuccess": onXhrDataLoadingSuccess,
  };
})();
