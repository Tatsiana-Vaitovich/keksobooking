"use strict";

(function() {

  function getAvatars(min, max) {
    const arr = [];
    for (let i = (min - 1); i < max; i++) {
      const url = "img/avatars/user0" + (i + 1) + ".png";
      arr[i] = url;
    }
    return arr;
  }

  window.getMyMock = {};
  window.getMyMock.getAvatars = getAvatars;
})();
