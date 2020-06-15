"use strict";

// конструктор объекта UserNotice()

function UserNotice(number, location) {
  this.author = new UserAuthor(number);
  this.offer = new UserOffer(number, location);
  this.location = location;
}
