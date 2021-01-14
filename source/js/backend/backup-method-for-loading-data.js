"use strict";

// резервный способ загрузки данных
// если не разрешен доступ к данным
// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource

(function() {

  function useMock() {

    console.log("use mock");

    const data = window.data.mock;
    window._drawReceivedData(data);

    // window.data.usersNoticesOrigin = window.data.mock;
    // window.data.usersNotices = window.data.usersNoticesOrigin.slice();
    // window.usersNotice.showMapPins(window.data.usersNotices);
  }

  function useJSONP() {

    console.log("use JSONP");

    const scriptJSONP = document.createElement("script");
    scriptJSONP.src = window.constants.URL_GET + "?callback=_drawReceivedData";

    document.body.append(scriptJSONP);
  }

  function useMyMock() {

    console.log("use myMock");

    // Создаю массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку
    // перед тем как создать массив объектов, перемешаю массив заголовков
    window.util.shuffle(window.getMyMock.data.titlesArr);
    const data = window.getMyMock.getUsersNotices.createUsersNotices(8);
    window._drawReceivedData(data);
    // window.data.usersNoticesOrigin = window.getMyMock.getUsersNotices.createUsersNotices(8);
    // window.data.usersNotices = window.data.usersNoticesOrigin.slice();
    // window.usersNotice.showMapPins(window.data.usersNotices);
  }

  const _drawReceivedData = function(data) {
    window.data.usersNoticesOrigin = data;
    window.data.usersNotices = window.data.usersNoticesOrigin.slice();
    window.usersNotice.showMapPins(window.data.usersNotices);
  };

  window.backend = {};
  window.backend.backupMethodForLoadingData = {
    "useMock": useMock,
    "useJSONP": useJSONP,
    "useMyMock": useMyMock,
  };

  window._drawReceivedData = _drawReceivedData;
})();
