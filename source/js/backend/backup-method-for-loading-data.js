"use strict";

// резервный способ загрузки данных
// если не разрешен доступ к данным
// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource

(function() {

  function useMock() {

    console.log("use mock");

    const data = window.data.mock;
    drawReceivedData(data);
  }

  function useJSONP() {

    console.log("use JSONP");

    // function sentRequestJSONP() {
    //   return new Promise(function(resolve) {
    //     const scriptJSONP = document.createElement("script");
    //     scriptJSONP.src = window.constants.URL_GET + "?callback=_JSONPcallback";
    //     document.body.append(scriptJSONP);
    //     resolve(true);
    //   });
    // }

    // try {
    const scriptJSONP = document.createElement("script");
    scriptJSONP.src = window.constants.URL_GET + "?callback=_JSONPcallback";
    document.body.append(scriptJSONP);
    //   sentRequestJSONP()
    //   .then(function(result) {
    //     if (result) {
    //       const pins = window.dom.mapPins.querySelectorAll("button");
    //       console.log(pins);
    //       const count = pins.length;
    //       console.log(count);
    //       if (count === 1) {
    //         throw new SyntaxError("не удалось получить данные по JSONP");
    //       }
    //     }
    //   },
    //   function() {
    //     throw new SyntaxError("ну удалось получить данные");
    //   });
    // если jsonp не срабатывает не получается споймать ошибку
    // } catch (error) {
    //   console.log(error.name + " " + error.message);
    //   useMock();
    // }
  }

  function useMyMock() {

    console.log("use myMock");

    // Создаю массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку
    // перед тем как создать массив объектов, перемешаю массив заголовков
    window.util.shuffle(window.getMyMock.data.titlesArr);
    const data = window.getMyMock.getUsersNotices.createUsersNotices(8);
    drawReceivedData(data);
  }

  function drawReceivedData(data) {
    window.data.usersNoticesOrigin = data;
    window.data.usersNotices = window.data.usersNoticesOrigin.slice();
    window.usersNotice.showMapPins(window.data.usersNotices);
  }

  const _JSONPcallback = function(data) {
    drawReceivedData(data); // если выполняется с ошибкой - не могу ее обработать
  };

  window.backend = {};
  window.backend.backupMethodForLoadingData = {
    "useMock": useMock,
    "useJSONP": useJSONP,
    "useMyMock": useMyMock,
    "drawReceivedData": drawReceivedData,
  };

  window._JSONPcallback = _JSONPcallback;
})();
