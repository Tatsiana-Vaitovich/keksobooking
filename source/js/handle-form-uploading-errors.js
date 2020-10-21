"use strict";

(function() {

  function onXhrFormUploadingErrors(message) {

    const TIME_SHOW_MESSAGE = 2000;
    const elem = window.dom.success;
    const successMessage = elem.querySelector(".success__message");

    successMessage.innerHTML = message;
    window.util.removeClass(elem, "hidden");
    window.dom.form.reset();
    setTimeout(window.form.hiddenMessage, TIME_SHOW_MESSAGE);
  }

  window.handleFormUploadingErrors = onXhrFormUploadingErrors;
})();
