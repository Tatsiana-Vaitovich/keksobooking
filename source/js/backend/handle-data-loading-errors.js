"use strict";

// обработка ошибок, которые могут возникнуть при загрузке данных с сервера

(function() {

  function onXhrDataLoadingErrors(message) {

    const errorMessage = window.createFragment.template.querySelector(".error-message").cloneNode(true);
    const whereInsertErrorMessage = window.dom.map;

    errorMessage.firstElementChild.textContent = message;
    errorMessage.style.zIndex = "100";
    window.util.removeClass(errorMessage, "hidden");

    whereInsertErrorMessage.appendChild(errorMessage);

    // удалим сообщение о ошибке через time_show_message
    setTimeout(removeMessage, window.constants.TIME_SHOW_MESSAGE_ERROR_OR_SUCCESS);

    function removeMessage() {
      window.util.removeElem(errorMessage);
    }
  }

  window.backend.handleDataLoadingErrors = onXhrDataLoadingErrors;
})();
