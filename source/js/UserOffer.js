"use strict";

// конструктор объекта UserOffer()

function UserOffer(number, location) {
  this.title = window.data.titlesArr[number];
  this.address = window.getStrokeCoords(location);
  this.price = window.util.getRandomNumber(window.data.minPrice, window.data.maxPrice);
  this.type = window.util.getRandomElement(window.data.typesArr);
  this.rooms = window.util.getRandomNumber(window.data.minRooms, window.data.maxRooms);
  this.guests = window.util.getRandomNumber(window.data.minGuests, window.data.maxGuests);
  this.checkin = window.util.getRandomElement(window.data.checkinsArr);
  this.checkout = window.util.getRandomElement(window.data.checkoutsArr);
  this.features = window.getFeatures(window.data.featuresArr);
  this.description = "";
  this.photos = window.util.shuffle(window.data.photosArr);
}
