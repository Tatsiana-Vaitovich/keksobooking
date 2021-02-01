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
    const CallbackRegistry = {}; // использую для того, чтобы была возможность отреагировать на ошибку jsonp
    window.CallbackRegistry = CallbackRegistry;

    let url = window.constants.URL_GET;
    let scriptOk = false; // флаг, что вызов прошел успешно
    // генерируем имя json-функции для запроса
    const callbackName = "_" + String(Math.random()).slice(-6);
    // укажем это имя в URL запроса
    url += ~url.indexOf("?") ? "&" : "?";
    url += "callback=CallbackRegistry." + callbackName;
    // console.log(window.CallbackRegistry);
    // ...и создадим функцию в реестре
    CallbackRegistry[callbackName] = function(data) {
      scriptOk = true; // обработчик вызвался, указать что все ок
      delete CallbackRegistry[callbackName]; // можно очистить реестр
      _JSONPcallback(data); // вызвать onSuccess
    };

    // эта функция сработает при любом результате запроса
    // важно: при успешном результате - всегда после jsonp - обработчика
    function checkCallback() {
      if (scriptOk) {
        return; // сработал обработчик?
      }
      delete CallbackRegistry[callbackName];
      useMock(); // нет - вызвать onError
    }

    const scriptJSONP = document.createElement("script");
    // в старых IE поддерживается только событие, а не onload/onerror
    // в теории 'readyState=loaded' означает "скрипт загрузился",
    // а 'readyState=complete' -- "скрипт выполнился", но иногда
    // почему-то случается только одно из них, поэтому проверяем оба
    scriptJSONP.onreadystatechange = function() {
      if (this.readyState === "complete" || this.readyState === "loaded") {
        this.onreadystatechange = null;
        setTimeout(checkCallback, 0); // Вызвать checkCallback - после скрипта
      }
    };

    // события script.onload/onerror срабатывают всегда после выполнения скрипта
    scriptJSONP.onload = scriptJSONP.onerror = checkCallback;
    scriptJSONP.src = url;
    document.body.append(scriptJSONP);
    // const scriptJSONP = document.createElement("script");
    // scriptJSONP.src = window.constants.URL_GET + "?callback=_JSONPcallback";
    // document.body.append(scriptJSONP);
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

  function _JSONPcallback(data) {
    drawReceivedData(data); // если выполняется с ошибкой - не могу ее обработать
  }
  // const _JSONPcallback = function(data) {
  //   drawReceivedData(data);
  // };

  window.backend = {};
  window.backend.backupMethodForLoadingData = {
    "useMock": useMock,
    "useJSONP": useJSONP,
    "useMyMock": useMyMock,
    "drawReceivedData": drawReceivedData,
  };

  window._JSONPcallback = _JSONPcallback;
})();
