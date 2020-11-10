"use strict";

// работа с сетью

(function() {

  // загрузка данных с сервера

  const URL_POST = "https//js.dump.academy/keksobooking";
  const URL_GET = "https://js.dump.academy/keksobooking/data";
  const MAX_WAITING_TIME_RESPONSE = 3000;
  // использую перечисление - объект для сохранения однородных данных (констант))

  const Code = {
    "SUCCESS": 200,
    "CACHED": 400,
    "NOT_FOUND_ERROR": 404,
    "SERVER_ERROR": 500,
  };

  // загрузка данных на сервер

  function upload(data, onLoad, onError) {
    const xhr = new XMLHttpRequest();
    let error;

    xhr.addEventListener("load", function() {
      switch (xhr.status) {
        case (Code.SUCCESS):
          onLoad();
          break;
        default:
          error = ("Извините, произошла ошибка,<br>Ваше объявление не удалось опубликовать");
      }
      if (error) {
        onError(error);
      }
    });

    // load произойдет даже если в ответ придет ошибка
    xhr.addEventListener("error", function() {
      error = "Не удалось загрузить форму.<br>Произошла ошибка соединения";
      onError(error);
    });

    xhr.open("POST", URL_POST);
    xhr.send(data);
  }

  // получение данных с сервера

  function load(onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = MAX_WAITING_TIME_RESPONSE;
    let error;

    xhr.addEventListener("load", function() {
      switch (xhr.status) {
        case (Code.SUCCESS):
          onLoad(xhr.response);
          break;
        case (Code.CACHED):
          error = "неверный запрос";
          break;
        case (Code.NOT_FOUND_ERROR):
          error = "ничего не найдено";
          break;
        default:
          error("Статус ответа: " + xhr.status + " xhr.statusText");
      }
      if (error) {
        onError(error);
      }
    });

    // load произойдет даже если в ответ придет ошибка
    xhr.addEventListener("error", function() {
      error = "Произошла ошибка соединения";
      onError(error);
      try {
        window.backupMethodForLoadingData.useJSONP();
      } catch (err) {
        console.log(err.message);
        window.backupMethodForLoadingData.useMock();
      }
    });

    // перестрахуемся от слишком долгого ответа
    xhr.addEventListener("timeout", function() {
      error = "Запрос не успел выполниться за " + xhr.timeout + "мс";
      onError(error);
    });

    xhr.open("GET", URL_GET);
    xhr.send();
  }

  window.backend = {
    "upload": upload,
    "load": load,
    "URL_GET": URL_GET,
  };

})();
