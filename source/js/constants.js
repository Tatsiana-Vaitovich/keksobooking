"use strict";

// const, которые используются в различных модулях проекта

(function() {

  const URL_POST = "https//js.dump.academy/keksobooking";
  const URL_GET = "https://js.dump.academy/keksobooking/data";
  const MAX_WAITING_TIME_RESPONSE = 3000; // ms
  const DEBOUNCE_INTERVAL = 5000; // ms
  const NUMBER_OF_USERS_NOTICES = 5;

  window.constants = {
    "URL_POST": URL_POST,
    "URL_GET": URL_GET,
    "MAX_WAITING_TIME_RESPONSE": MAX_WAITING_TIME_RESPONSE,
    "DEBOUNCE_INTERVAL": DEBOUNCE_INTERVAL,
    "NUMBER_OF_USERS_NOTICES": NUMBER_OF_USERS_NOTICES,
  };
})();
