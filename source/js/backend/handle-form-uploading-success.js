"use strict";

(function() {

  function onXhrFormUploadingSuccess() {

    const TIME_SHOW_MESSAGE = 2000;
    const elem = window.dom.success;

    window.util.removeClass(elem, "hidden");
    window.dom.form.reset();
    setTimeout(window.form.hiddenMessage, TIME_SHOW_MESSAGE);
  }

  window.backend.handleFormUploadingSuccess = onXhrFormUploadingSuccess;
})();

