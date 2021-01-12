"use strict";

// const, которые используются в различных модулях проекта

(function() {

  const URL_POST = "https//js.dump.academy/keksobooking";
  const URL_GET = "https://js.dump.academy/keksobooking/data";
  const URL_GET_TEST = "https://reqres.in/api/unknown/23";
  const MAX_WAITING_TIME_RESPONSE = 3000; // ms
  const TIME_SHOW_MESSAGE_ERROR_OR_SUCCESS = 1000;

  const DEBOUNCE_INTERVAL = 500; // ms
  const NUMBER_OF_USERS_NOTICES = 5;

  window.constants = {
    "URL_POST": URL_POST,
    "URL_GET": URL_GET,
    "URL_GET_TEST": URL_GET_TEST,
    "MAX_WAITING_TIME_RESPONSE": MAX_WAITING_TIME_RESPONSE,
    "TIME_SHOW_MESSAGE_ERROR_OR_SUCCESS": TIME_SHOW_MESSAGE_ERROR_OR_SUCCESS,
    "DEBOUNCE_INTERVAL": DEBOUNCE_INTERVAL,
    "NUMBER_OF_USERS_NOTICES": NUMBER_OF_USERS_NOTICES,
  };
})();
