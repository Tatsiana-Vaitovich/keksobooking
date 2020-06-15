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

