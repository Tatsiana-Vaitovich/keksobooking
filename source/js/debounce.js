
"use strict";

// функция для устранения "дребезга"
(function() {

  function debounce(fun) {
    let lastTimeout = null;

    return function() {
      // const args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function() {
        // С помощью apply() вы можете написать метод один раз,
        // а затем наследовать его в других объектах
        // без необходимости переписывать метод для каждого нового объекта.
        // ?? не понимаю, зачем в моем случае этот метод,
        // может просто вызвать fun - получится то же самое
        // fun.apply(null, args);
        fun.apply(fun, null);
      }, window.constants.DEBOUNCE_INTERVAL);
      // lastTimeout = window.setTimeout(fun, window.constants.DEBOUNCE_INTERVAL);
    };
  }

  window.debounce = debounce;
})();

