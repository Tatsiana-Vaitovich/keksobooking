"use strict";

// работа с сетью, Fetch

(function() {

  const Code = {
    "SUCCESS": 200,
    "CACHED": 400,
    "NOT_FOUND_ERROR": 404,
    "SERVER_ERROR": 500,
  };

  let error;

  function onGetResponseForLoadSuccess(onLoad, onError, respons) {
    switch (response.status) {
      case (Code.SUCCESS):
        const json = respons.json();
        onLoad(json);
        break;
      case (Code.CACHED):
        error = "неверный запрос";
        break;
      case (Code.NOT_FOUND_ERROR):
        error = "ничего не найдено";
        break;
      default:
        error("not found");
    }
    if (error) {
      onError(error);
    }
  }

  function onGetResponseForLoadError(onError) {
    error = "Произошла ошибка соединения";
    onError(error);
    try {
      window.backend.backupMethodForLoadingData.useJSONP();
    } catch (err) {
      console.log(err.message);
      window.backend.backupMethodForLoadingData.useMock();
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

  function loadTest() {
    let a = 1;
    const promise = new Promise(function(resolve) {
      // здесь пишем асинхронный код, результата
      // выполнения которого мы должны дождаться.
      // в нашем случае мы ждем получения ответа с сервера
      setTimeout(function() {
        a = 21;
        resolve(a);// в результат выполнения промиса передать resolve со значением а
        // reject(new Error("no!!"));// в результат выполнения промиса передать reject со значением new Error("no!!")
        // результатом выполнения промиса может быть ИЛИ resolve ИЛИ reject
      }, 2000);
    });

    // после создания самого промиса, где указали, чего
    // нужно дождаться, нужно описать, что сделать, когда
    // промис выполнится
    promise.then(function(result) {
      console.log(result);
    });
    console.log(a);
  }

  function loadPromise(onLoad, onError) {
    const promise = new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.timeout = window.constants.MAX_WAITING_TIME_RESPONSE;
      const result = xhr.response;
      xhr.open("GET", window.constants.URL_GET);
      xhr.send();
      if (xhr.response) {
        resolve(result);
      } else {
        reject(new Error("error"));
      }
    });

    promise.then(
        function(result) {
          onGetResponseForLoadSuccess(onLoad, onError, result);
        },
        function(error) {
          console.log(error);
          onGetResponseForLoadError(onError);
        }
    );
  }

  function load(onLoad, onError) {
    const promise = fetch(window.constants.URL_GET);
    promise.then(function(response) {
      onGetResponseForLoadSuccess(onLoad, onError, response);
    },
    function() {
      onGetResponseForLoadError(onError);
    });
  }

  window.backend.backendFetch = {
    "load": load,
    "loadPromise": loadPromise,
    "loadTest": loadTest,
  };
})();

