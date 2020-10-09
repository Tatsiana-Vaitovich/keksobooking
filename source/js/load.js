"use strict";

// получение данных с сервера

(function() {

  const URL = "//https:js.dump.academy/keksobooking/data";

  function load(onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.open("GET", URL);
    xhr.addEventListener("load", function() {
      onSuccess(xhr.response);
    });
    xhr.send();
  }

  window.load = load;
})();
