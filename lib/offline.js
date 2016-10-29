"use strict";

var Macro = require('./macro');
var TypeWriter = require('typewriter');

const identifier = 'offline';

class OfflineMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  defaultConfig() {
    return {};
  }

  start() {
    this.setColor('#000000');

    var backgroundHeight = 10,
        topMargin = (this.dimensions.height - backgroundHeight) / 2;

    for(var x = 0; x < this.dimensions.width; x++) {
      for(var y = 0; y < backgroundHeight; y++) {
        this.callbacks.onPixelChange(y + topMargin, x, '#8e0101');
      }
    }

    var typeWriter = new TypeWriter({
      font: 'system-6',
      startingColumn: 3,
      startingRow: topMargin + 2,
      wrap: 'no-wrap'
    });

    setTimeout(() => {
      typeWriter.write('OFFLINE', (coordinates) => {
        coordinates.forEach((coordinate) => {
          this.callbacks.onPixelChange(coordinate.y, coordinate.x, '#FFFFFF');
        });
      });
    }, 500);
  }

  stop() {
    this.setColor('#000000');
  }
}

module.exports = OfflineMacro;
