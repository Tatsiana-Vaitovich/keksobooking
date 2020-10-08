"use strict";

// загрузка данных с сервера

(function() {

  const URL = "https//js.dump.academy/keksobooking";

  function upload(data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.response = "json";

    xhr.addEventListener("load", function() {
      onSuccess(xhr.response);
    });

    xhr.open("POST", URL);
    xhr.send(data);
  }

  window.upload = upload;
})();
