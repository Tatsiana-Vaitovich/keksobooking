"use strict";

(function() {

  function onXhrFormUploadingErrors(message) {

    const elem = window.dom.success;
    const successMessage = elem.querySelector(".success__message");

    successMessage.innerHTML = message;
    window.util.removeClass(elem, "hidden");
    window.dom.form.reset();
    setTimeout(window.form.hiddenMessage, window.constants.TIME_SHOW_MESSAGE_ERROR_OR_SUCCESS);
  }

  window.backend.handleFormUploadingErrors = onXhrFormUploadingErrors;
})();
