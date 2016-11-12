"use strict";

var Macro = require('./macro');

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
    var result = this.dotGenerator.text({
      font: this.config.font,
      startingColumn: this.dimensions.width,
      wrap: 'no-wrap',
      text: this.config.text,
      color: this.config.color
    });

    result.dots.forEach((dot) => {
      this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
      coordinates.push({y: item.y, x: item.x});
    });

    var messageLength = result.width;

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
