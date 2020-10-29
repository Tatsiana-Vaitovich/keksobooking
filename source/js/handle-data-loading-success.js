"use strict";

// функция, которая запустится при успешной загрузке данных с сервера

(function() {

  const NUMBER_OF_USERS_NOTICES = 5;

  function onXhrDataLoadingSuccess(data) {
    window.data.usersNotices = data;
    window.usersNotice.showMapPins(window.data.usersNotice);
  }

  window.handleDateLoadingSuccess = {
    "handleDateLoadingSuccess": onXhrDataLoadingSuccess,
    "NUMBER_OF_USERS_NOTICES": NUMBER_OF_USERS_NOTICES,
  };
})();
