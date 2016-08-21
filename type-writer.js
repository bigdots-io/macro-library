"use strict";

var characters = require('./characters');

class TypeWriter {
  constructor() {
    this.column = 0;
    this.spaceBetweenLetters = 2;
  }

  text(copy, callback) {
    for (let i = 0; i < copy.length; i++) {
      var points = characters[copy[i]];
      if(points) {
        var y, x;
        points.forEach((point) => {
          [y, x] = point.split(':');
          callback({
            y: parseInt(y, 10),
            x: this.column + parseInt(x, 10)
          });
        });
        this.column = this.column + parseInt(x, 10) + this.spaceBetweenLetters;
      }
    }
  }
}

module.exports = TypeWriter;
