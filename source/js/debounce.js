
"use strict";

// функция для устранения "дребезга"
(function() {

  function debounce(fun) {
    let lastTimeout = null;

    return function(...args) {
      // ...args остаточные параметры -
      // использую для получения массива аргументов функции
      // применяется вместо устаревшего способа обращения
      // к аргументам "arguments", который возвращает псевдомассив
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function() {
        fun.apply(fun, args);
      }, window.constants.DEBOUNCE_INTERVAL);
    };
  }

  window.debounce = debounce;
})();

