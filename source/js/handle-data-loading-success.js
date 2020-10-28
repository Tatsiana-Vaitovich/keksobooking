"use strict";

// функция, которая запустится при успешной загрузке данных с сервера

(function() {

  const NUMBER_OF_USERS_NOTICES = 5;

  function onXhrDataLoadingSuccess(data) {
    window.data.usersNotices = data;
    window.usersNotice.getMapPins(window.data.usersNotice, window.createFragment.elem1, NUMBER_OF_USERS_NOTICES);
  }

  window.handleDateLoadingSuccess = {
    "handleDateLoadingSuccess": onXhrDataLoadingSuccess,
    "NUMBER_OF_USERS_NOTICES": NUMBER_OF_USERS_NOTICES,
  };
})();
