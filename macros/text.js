"use strict";

var Macro = require('./macro');
var TypeWriter = require('typewriter');

const identifier = 'text';

class SolidColorMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  start() {
    this.setColor('#000000');

    var config = this.config;
    var coordinates = [];
    var typeWriter = new TypeWriter({ font: this.config.font});
    typeWriter.text(this.config.text, (item) => {
      this.callbacks.onPixelChange(item.y, item.x, this.config.color);
      coordinates.push({y: item.y, x: item.x});
    });

    var messageLength = typeWriter.getWidth(this.config.text);

    if (messageLength > this.dimensions.width) {
      setTimeout(() => {
        var offset = 0;
        this.interval = setInterval(() => {
          coordinates.forEach((coordinate) => {
            this.callbacks.onPixelChange(coordinate.y, coordinate.x - offset, '#000000');
          });
          coordinates.forEach((coordinate) => {
            this.callbacks.onPixelChange(coordinate.y, coordinate.x - (offset + 1), this.config.color);
          });

          if(offset > messageLength) {
            offset = -(this.dimensions.width);
          }

          offset += 1;
        }, this.config.marqueeSpeed);
      }, this.config.marqueeInitialDelay);
    }
  }

  stop() {
    if (this.config.marquee) {
      clearInterval(this.interval);
    }
  }
}

module.exports = SolidColorMacro;
