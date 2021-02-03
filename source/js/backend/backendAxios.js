"use strict";

// работа с сетью axios
// axios, в отличие от xhr и fetch позволяет не обрабатывать respons.status;
// если ответ пришел с ошибкой, сразу попадаем в "error".

(function() {

  function onAxiosGetResponseForLoadError(onError, message) {
    onError(message);
    window.backend.backupMethodForLoadingData.useJSONP();
  }

  function onAxiosGetResponseForUploadErrors(onError, message) {
    onError(message);
  }

  function backendAxios(onLoad, onError, data) {
    let promise;
    let url;
    let functionErrors;
    if (arguments.length === 2) {
      url = window.constants.URL_GET;
      functionErrors = onAxiosGetResponseForLoadError;
      promise = axios.get(url);
    } else {
      url = window.constants.URL_POST;
      functionErrors = onAxiosGetResponseForUploadErrors;
      promise = axios.post(url, data);
    }
    promise.then(function(response) {
      onLoad(response.data);
    })
    .catch(function(error) {
      functionErrors(onError, error.message);
    });
  }

  window.backend.backendAxios = {
    "backendAxiosGeneral": backendAxios,
  };
})();
