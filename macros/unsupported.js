"use strict";

var Macro = require('./macro');
var TypeWriter = require('../type-writer');

const identifier = 'unsupported';

class UnsupportedMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  start() {
    this.setColor('#000000');

    var typeWriter = new TypeWriter();
    typeWriter.text("UNSUPPORTED", (item) => {
      this.callbacks.onPixelChange(item.y, item.x, '#FFFFFF');
    });
  }

  stop() {
    // Nothing..
  }
}

var data = [
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0]
];

module.exports = UnsupportedMacro;
