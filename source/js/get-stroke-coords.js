"use strict";

(function() {

  function getStrokeCoords(location) {
    return (location.x + ", " + location.y);
  }

  window.getStrokeCoords = getStrokeCoords;
})();
