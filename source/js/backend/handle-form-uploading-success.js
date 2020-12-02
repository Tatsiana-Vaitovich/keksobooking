"use strict";

(function() {

  function onXhrFormUploadingSuccess() {

    const elem = window.dom.success;

    window.util.removeClass(elem, "hidden");
    window.dom.form.reset();
    setTimeout(window.form.hiddenMessage, window.constants.TIME_SHOW_MESSAGE_ERROR_OR_SUCCESS);
  }

  window.backend.handleFormUploadingSuccess = onXhrFormUploadingSuccess;
})();

