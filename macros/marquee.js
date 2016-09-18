"use strict";

var Macro = require('./macro');
var TypeWriter = require('typewriter');

const identifier = 'marquee';

class MarqueeMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  start() {
    this.setColor('#000000');

    var config = this.config;
    var coordinates = [];
    var typeWriter = new TypeWriter({
      font: this.config.font,
      startingColumn: this.dimensions.width,
      wrap: 'no-wrap'
    });

    typeWriter.text(this.config.text, (item) => {
      this.callbacks.onPixelChange(item.y, item.x, this.config.color);
      coordinates.push({y: item.y, x: item.x});
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
    if (this.config.marquee) {
      clearInterval(this.interval);
    }
  }
}

module.exports = MarqueeMacro;
