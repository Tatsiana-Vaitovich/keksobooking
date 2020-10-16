"use strict";

// функция, которая запустится при успешной загрузке данных с сервера

(function() {

  function onXhrDataLoadingSuccess(data) {
    window.data.usersNotices = data;
    window.usersNotice.getMapPins(window.data.usersNotice, window.createFragment.elem1, 8);
  }

  window.handleDateLoadingSuccess = onXhrDataLoadingSuccess;
})();
