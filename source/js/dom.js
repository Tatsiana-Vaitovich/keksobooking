"use strict";

// переменные, повторно используемые в разных модулях

(function() {

  const map = document.querySelector(".map");
  const mapPins = document.querySelector(".map__pins");
  const form = document.querySelector(".ad-form");
  const success = document.querySelector(".success");
  const mapFilters = map.querySelector(".map__filters");

  window.dom = {
    "map": map,
    "mapPins": mapPins,
    "form": form,
    "success": success,
    "mapFilters": mapFilters,
  };
})();
