"use strict";

var Macro = require('./macro');
var TypeWriter = require('typewriter');

const identifier = 'unsupported';

class UnsupportedMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  start() {
    this.setColor('#000000');

    var typeWriter = new TypeWriter({font: 'system-6'});
    typeWriter.write("UNSUPPORTED", (coordinates) => {
      coordinates.forEach((coordinate) => {
        this.callbacks.onPixelChange(coordinate.y, coordinate.x, '#FFFFFF');
      });
    });
  }

  stop() {
    // Nothing..
  }
}

module.exports = UnsupportedMacro;
