"use strict";

// получаю объявления пользователей
// и mapPinы на основе этих объявлений

(function() {

  function getLocation(indent) {
    const location = {};
    const coord = new GetCoord(window.dom.mapPins, indent);
    location.x = coord.getCoordX();
    location.y = coord.getCoordY();
    return location;
  }

  function createUsersNotices(elementsQuantity) {
    const usersNotices = [];
    for (let i = 0; i < elementsQuantity; i++) {
      const location = getLocation(window.data.indent);
      usersNotices[i] = new UserNotice(i, location);
    }
    return usersNotices;
  }

  window.getMyMock.getUsersNotices = {
    "createUsersNotices": createUsersNotices,
  };
})();
