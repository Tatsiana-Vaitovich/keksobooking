"use strict";

// работа с сетью

(function() {

  // загрузка данных с сервера
  // использую перечисление - объект для сохранения однородных данных (констант))

  const Code = {
    "SUCCESS": 200,
    "CACHED": 400,
    "NOT_FOUND_ERROR": 404,
    "SERVER_ERROR": 500,
  };

  function onXhrGetResponseForLoad(onLoad, onError) {
    switch (this.status) {
      case (Code.SUCCESS):
        onLoad(this.response);
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
  }

  function onXhrGetResponseForUpload(onLoad, onError) {
    switch (this.status) {
      case (Code.SUCCESS):
        onLoad();
        break;
      default:
        error = "Извините, произошла ошибка,<br>Ваше объявление не удалось опубликовать";
    }
    if (error) {
      onError(error);
    }
  }

  // загрузка данных на сервер

  // function upload(data, onLoad, onError) {
  //   const xhr = new XMLHttpRequest();
  //   let error;

  //   xhr.addEventListener("load", function() {
  //     onXhrGetResponseForUpload(onLoad, onError);
  //     // switch (xhr.status) {
  //     //   case (Code.SUCCESS):
  //     //     onLoad();
  //     //     break;
  //     //   default:
  //     //     error = "Извините, произошла ошибка,<br>Ваше объявление не удалось опубликовать";
  //     // }
  //     // if (error) {
  //     //   onError(error);
  //     // }
  //   });

  //   // load произойдет даже если в ответ придет ошибка
  //   xhr.addEventListener("error", function() {
  //     error = "Не удалось загрузить форму.<br>Произошла ошибка соединения";
  //     onError(error);
  //   });

  //   xhr.open("POST", window.constants.URL_POST);
  //   xhr.send(data);
  // }

  // получение данных с сервера

  // function load(onLoad, onError) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = "json";
  //   xhr.timeout = window.constants.MAX_WAITING_TIME_RESPONSE;
  //   let error;

  //   xhr.addEventListener("load", function() {
  //     onXhrGetResponseForLoad(onLoad, onError);
  //     // switch (xhr.status) {
  //     //   case (Code.SUCCESS):
  //     //     onLoad(xhr.response);
  //     //     break;
  //     //   case (Code.CACHED):
  //     //     error = "неверный запрос";
  //     //     break;
  //     //   case (Code.NOT_FOUND_ERROR):
  //     //     error = "ничего не найдено";
  //     //     break;
  //     //   default:
  //     //     error("Статус ответа: " + xhr.status + " xhr.statusText");
  //     // }
  //     // if (error) {
  //     //   onError(error);
  //     // }
  //   });

  //   // load произойдет даже если в ответ придет ошибка
  //   xhr.addEventListener("error", function() {
  //     error = "Произошла ошибка соединения";
  //     onError(error);
  //     try {
  //       window.backend.backupMethodForLoadingData.useJSONP();
  //     } catch (err) {
  //       console.log(err.message);
  //       window.backend.backupMethodForLoadingData.useMock();
  //     }
  //   });

  //   // перестрахуемся от слишком долгого ответа
  //   xhr.addEventListener("timeout", function() {
  //     error = "Запрос не успел выполниться за " + xhr.timeout + "мс";
  //     onError(error);
  //   });

  //   xhr.open("GET", window.constants.URL_GET);
  //   xhr.send();
  // }

  function backend(onLoad, onError, data) {
    const xhr = new XMLHttpRequest();
    let error;
    let url;
    let method;
    switch (arguments.length) {
      case (2):
        xhr.responseType = "json";
        xhr.timeout = window.constants.MAX_WAITING_TIME_RESPONSE;
        url = window.constants.URL_GET;
        method = "GET";
        xhr.addEventListener("load", function() {
          onXhrGetResponseForLoad(onLoad);
        });
        xhr.addEventListener("error", function() {
          error = "Произошла ошибка соединения";
          onError(error);
          try {
            window.backend.backupMethodForLoadingData.useJSONP();
          } catch (err) {
            console.log(err.message);
            window.backend.backupMethodForLoadingData.useMock();
          }
        });
        xhr.addEventListener("timeout", function() {
          error = "Запрос не успел выполниться за " + xhr.timeout + "мс";
          onError(error);
        });
        xhr.open(method, url);
        xhr.send();
        break;
      case (3):
        url = window.constants.URL_POST;
        method = "POST";
        xhr.addEventListener("load", function() {
          onXhrGetResponseForUpload(onLoad);
        });
        xhr.addEventListener("error", function() {
          error = "Не удалось загрузить форму.<br>Произошла ошибка соединения";
          onError(error);
        });
        xhr.open("POST", url);
        xhr.send(data);
    }
  }

  const upload = backend.bind(backend);
  const load = backend.bind(backend);

  window.backend.backendXHR = {
    "upload": upload,
    "load": load,
  };
})();
