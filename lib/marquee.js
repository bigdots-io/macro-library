"use strict";

var Macro = require('./macro');
var TypeWriter = require('typewriter');

const identifier = 'marquee';

class MarqueeMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  defaultConfig() {
    return {
      color: '#FFFFFF',
      font: 'system-16',
      text: 'Replace with marquee text!'
    };
  }

  start() {
    this.setColor('#000000');

    var coordinates = [];
    var typeWriter = new TypeWriter({
      font: this.config.font,
      startingColumn: this.dimensions.width,
      wrap: 'no-wrap'
    });

    typeWriter.write(this.config.text, (items) => {
      items.forEach((item) => {
        this.callbacks.onPixelChange(item.y, item.x, this.config.color);
        coordinates.push({y: item.y, x: item.x});
      });
    });

    var messageLength = typeWriter.getWidth(this.config.text);

    var offset = 0;

    this.interval = setInterval(() => {
      coordinates.forEach((coordinate) => {
        this.callbacks.onPixelChange(coordinate.y, coordinate.x - offset, '#000000');
      });
      coordinates.forEach((coordinate) => {
        this.callbacks.onPixelChange(coordinate.y, coordinate.x - (offset + 1), this.config.color);
      });

      var loopPoint = (this.dimensions.width > messageLength ? this.dimensions.width : messageLength);
      loopPoint += messageLength;

      if(offset > loopPoint) {
        offset = 0;
      }

      offset += 1;
    }, this.config.marqueeSpeed);
  }

  stop() {
    clearInterval(this.interval);
  }
}

module.exports = MarqueeMacro;
