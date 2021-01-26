"use strict";

// работа с сетью, Promise and Fetch

(function() {

  const Code = {
    "CREATE": 201,
    "SUCCESS": 200,
    "CACHED": 400,
    "NOT_FOUND_ERROR": 404,
    "SERVER_ERROR": 500,
  };

  // --------promise-------

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

  function sentRequest(method, url, data, code, functionSuccess, onError) {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      // xhr.timeout = window.constants.MAX_WAITING_TIME_RESPONSE;
      xhr.addEventListener("load", function() {
        console.log(this.status);
        if (this.status === code) {
          resolve(this.response);
        } else {
          functionSuccess(onError, this.status);
        }
      });
      xhr.addEventListener("error", function() {
        reject(this.response);
      });
      xhr.open(method, url, data);
      xhr.send();
    });
  }

  function onPromiseGetResponseForLoadSuccess(onError, status) {
    let error;
    switch (status) {
      case (Code.CACHED):
        error = "неверный запрос";
        break;
      case (Code.NOT_FOUND_ERROR):
        error = "ничего не найдено";
        break;
      default:
        error = "Not Found";
    }
    onError(error);
  }

  function onPromiseGetResponseForUploadSuccess(onError) {
    const error = "Извините, произошла ошибка,<br>Ваше объявление не удалось опубликовать";
    onError(error);
  }

  // возможно, удобнее использовать отдельные функции для GET and POST requests??
  function loadPromise(onLoad, onError) {
    sentRequest("GET", window.constants.URL_GET_TEST)
    .then(function(response) {
      onGetResponseForLoadSuccess(onLoad, onError, response);
    }, function() {
      onGetResponseForLoadError(onError);
    });
  }

  function upLoadPromise(onLoad, onError, data) {
    sentRequest("POST", window.constants.URL_POST, data)
    .then(function(response) {
      onFetchGetResponseForUploadSuccess(onLoad, onError, response);
    }, function() {
      onFetchGetResponseForUploadErrors(onError);
    });
  }

  function backendPromise(onLoad, onError, data) {
    let url;
    let method;
    let code;
    let functionSuccess;
    let functionErrors;
    if (arguments.length === 2) {
      url = window.constants.URL_GET;
      method = "GET";
      code = Code.SUCCESS;
      functionSuccess = onPromiseGetResponseForLoadSuccess;
      functionErrors = onFetchGetResponseForLoadError;
    } else {
      url = window.constants.URL_POST;
      method = "POST";
      code = Code.CREATE;
      functionSuccess = onPromiseGetResponseForUploadSuccess;
      functionErrors = onFetchGetResponseForUploadErrors;
    }

    sentRequest(method, url, data, code, functionSuccess, onError)
    .then(function(response) {
      onLoad(response);
    }, function() {
      functionErrors(onError);
    });
  }

  // ------fetch---------

  function onFetchGetResponseForLoadSuccess(onLoad, onError, respons) {
    let error;
    switch (respons.status) {
      case (Code.SUCCESS):
        const json = respons.json();
        onLoad(json);
        onLoad(respons);
        break;
      case (Code.CACHED):
        error = "неверный запрос";
        break;
      case (Code.NOT_FOUND_ERROR):
        error = "ничего не найдено";
        break;
      default:
        error = "Not Found";
    }
    if (error) {
      onError(error);
    }
  }

  function onFetchGetResponseForLoadError(onError) {
    const error = "Извините, произошла ошибка";
    onError(error);
    new Promise(function(resolve) {
      resolve(window.backend.backupMethodForLoadingData.useJSONP());
    }).catch(() => window.backend.backupMethodForLoadingData.useMyMock());
    // если jsonp приходит с ошибкой - не получается обработать эту ошибку????
  }

  function onFetchGetResponseForUploadSuccess(onLoad, onError, respons) {
    if (respons.status === Code.CREATE) {
      // если использую URL_POST_TEST, no-cors: ответ type: "opaque"; status в любом случае 0;
      onLoad();
    } else {
      const error = "Извините, произошла ошибка,<br>Ваше объявление не удалось опубликовать";
      onError(error);
    }
  }

  function onFetchGetResponseForUploadErrors(onError) {
    const error = "Не удалось загрузить форму.<br>Произошла ошибка соединения";
    onError(error);
  }

  // возможно, удобнее использовать отдельные функции для GET and POST requests??
  function load(onLoad, onError) {
    const promise = fetch(window.constants.URL_GET);
    promise.then(function(respons) {
      onFetchGetResponseForLoadSuccess(onLoad, onError, respons);
    },
    function() {
      onFetchGetResponseForLoadError(onError);
    });
  }

  function upload(onLoad, onError, data) {
    // метод fetch возвращает промис
    const promise = fetch(window.constants.URL_POST_TEST, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: data,
    });
    promise.then(function(respons) {
      onFetchGetResponseForUploadSuccess(onLoad, onError, respons);
    },
    function() {
      onFetchGetResponseForUploadErrors(onError);
    });
  }

  function backendFetch(onLoad, onError, data) {
    let url;
    let method;
    let functionSuccess;
    let functionErrors;
    let options;

    if (arguments.length === 2) {
      url = window.constants.URL_GET;
      method = "GET";
      functionSuccess = onFetchGetResponseForLoadSuccess;
      functionErrors = onFetchGetResponseForLoadError;
    } else {
      url = window.constants.URL_POST;
      method = "POST";
      functionSuccess = onFetchGetResponseForUploadSuccess;
      functionErrors = onFetchGetResponseForUploadErrors;
      options = {
        "method": method,
        "mode": "no-cors",
        "headers": {
          "Content-Type": "application/json;charset=utf-8",
        },
        "body": data,
      };
    }

    const promise = fetch(method, url, options);
    promise.then(function(respons) {
      functionSuccess(onLoad, onError, respons);
    },
    function() {
      functionErrors(onError);
    });
  }

  window.backend.backendFetch = {
    "load": load,
    "upload": upload,
    "backendFetchGeneral": backendFetch,
    "loadTest": loadTest,
    "loadPromise": loadPromise,
    "upLoadPromise": upLoadPromise,
    "backendPromiseGeneral": backendPromise,
  };
})();
