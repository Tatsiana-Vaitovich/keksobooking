"use strict";

// работа с сетью

(function() {

  // загрузка данных с сервера

  const URL_POST = "https//js.dump.academy/keksobooking";
  const URL_GET = "https://js.dump.academy/keksobooking/data";
  const MAX_WAITING_TIME_RESPONSE = 1000;

  let error;

  // обработка xhr ответа

  function handleXhrResponse(onSuccess, onError) {
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;
      case 400:
        error = "неверный запрос";
        break;
      case 404:
        error = "ничего не найдено";
        break;
      default:
        error("Статус ответа: " + xhr.status + " xhr.statusText");
    }
    if (error) {
      onError(error);
    }
  }

  // загрузка данных на сервер

  function upload(data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.response = "json";

    xhr.addEventListener("load", function() {
      handleXhrResponse(onSuccess, onError);
    });
    // xhr.addEventListener("load", function() {
    //   onSuccess(xhr.response);

    xhr.open("POST", URL_POST);
    xhr.send(data);
  }

  // получение данных с сервера

  function load(onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = MAX_WAITING_TIME_RESPONSE;

    xhr.addEventListener("load", function() {
      handleXhrResponse(onLoad, onError);
    });

    // load произойдет даже если в ответ придет ошибка
    xhr.addEventListener("error", function() {
      error = "Произошла ошибка соединения";
      onError(error);
      window.buckupMethodForLoadingData.useMock();
    });

    // перестрахуемся от слишком долгого ответа
    xhr.addEventListener("timeout", function() {
      error = "Запрос не успел выполниться за " + xhr.timeout + "мс";
      onError(error);
    });

    xhr.open("GET", URL_GET);
    // xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
    xhr.send();
  }

  window.backend = {
    "upload": upload,
    "load": load,
    "urlGet": URL_GET,
  };

})();
