"use strict";

// резервный способ загрузки данных
// если не разрешен доступ к данным
// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource

(function() {

  // function loadDataUsingJSONP() {

  //   const callback = function(data) {
  //     const objJson = data;
  //     const objJs = JSON.parse(objJson);
  //     window.data.usersNotices = objJs;
  //   };

  //   // const URL = window.backend.urlGet;
  //   const URL = "//js.dump.academy/keksobooking/data";
  //   const scriptJSONP = document.createElement("script");
  //   scriptJSONP.src = URL + "?callback=callback";

  //   document.body.append(scriptJSONP);
  // }

  function useMock() {
    if (window.data.mock) {
      window.usersNotice.getMapPins(mock, window.createFragment.elem1, 8);
    } else {
      // Создаю массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку
      // перед тем как создать массив объектов, перемешаю массив заголовков
      window.util.shuffle(window.data.titlesArr);
      window.data.usersNotices = window.usersNotice.createUsersNotices(8);
      window.usersNotice.getMapPins(window.data.usersNotices, window.createFragment.elem1, 8);
    }
  }

  window.buckupMethodForLoadingData = {
    "useMock": useMock,
  };
})();
