
"use strict";

// функция для устранения "дребезга"
(function() {

  const DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function(fun) {
    let lastTimeout = null;

    return function() {
      const args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function() {
        // С помощью apply() вы можете написать метод один раз,
        // а затем наследовать его в других объектах
        // без необходимости переписывать метод для каждого нового объекта.
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();

// пример использования функции debounce():
window.wizard.onEyesChange = function(color) {
  eyesColor = color;
  window.debounce(updateWizards);
};
