"use strict";

// обработка ошибок, которые могут возникнуть при загрузке данных с сервера

(function() {

  function onError(message) {
    const parentNode = window.dom.success;
    const errorMessage = parentNode.cloneNode(true);
    const TIME_SHOW_MESSAGE = 3000;

    errorMessage.firstElementChild.textContent = message;
    errorMessage.style.zIndex = "100";
    window.util.removeClass(errorMessage, "hidden");
    window.dom.map.appendChild(errorMessage);

    // удалим сообщение о ошибке через time_show_message
    setTimeout(removeMessage, TIME_SHOW_MESSAGE);

    function removeMessage() {
      window.util.removeElem(errorMessage);
    }
  }

  window.handleDataLoadingErrors = onError;
})();
