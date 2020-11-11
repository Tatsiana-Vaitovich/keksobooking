"use strict";

// конструктор класса GetCoord

class GetCoord {
  constructor(elem, indent) {
    this.elem = elem;
    this.indent = indent;
  }
  getCoordX() {
    const size = this.elem.offsetWidth;
    const coord = window.util.getRandomNumber(this.indent, (size - this.indent));
    return coord;
  }
  getCoordY() {
    const size = this.elem.offsetHeight;
    const coord = window.util.getRandomNumber(this.indent, (size - this.indent));
    return coord;
  }
}

// конструктор объкта UserAuthor()

function UserAuthor(number) {
  this.avatar = window.getMyMock.data.avatarsArr[number];
}

// конструктор объекта UserNotice()

function UserNotice(number, location) {
  this.author = new UserAuthor(number);
  this.offer = new UserOffer(number, location);
  this.location = location;
}

// конструктор объекта UserOffer()

function UserOffer(number, location) {
  this.title = window.getMyMock.data.titlesArr[number];
  this.address = window.getMyMock.getStrokeCoords(location);
  this.price = window.util.getRandomNumber(window.getMyMock.data.minPrice, window.getMyMock.data.maxPrice);
  this.type = window.util.getRandomElement(window.getMyMock.data.typesArr);
  this.rooms = window.util.getRandomNumber(window.getMyMock.data.minRooms, window.getMyMock.data.maxRooms);
  this.guests = window.util.getRandomNumber(window.getMyMock.data.minGuests, window.getMyMock.data.maxGuests);
  this.checkin = window.util.getRandomElement(window.getMyMock.data.checkinsArr);
  this.checkout = window.util.getRandomElement(window.getMyMock.data.checkoutsArr);
  this.features = window.getMyMock.getFeatures(window.getMyMock.data.featuresArr);
  this.description = "";
  this.photos = window.util.shuffle(window.getMyMock.data.photosArr);
}
