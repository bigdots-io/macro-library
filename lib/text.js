"use strict";

var Macro = require('./macro');
var TypeWriter = require('typewriter');

const identifier = 'text';

class TextMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  defaultConfig() {
    return {
      color: '#FFFFFF',
      font: 'system-6',
      text: 'Hello world!'
    };
  }

  start() {
    this.setColor('#000000');

    var config = this.config;
    var coordinates = [];
    var typeWriter = new TypeWriter({
      font: this.config.font,
      wrap: 'word'
    });
    typeWriter.text(this.config.text, (item) => {
      this.callbacks.onPixelChange(item.y, item.x, this.config.color);
      coordinates.push({y: item.y, x: item.x});
    });

    var messageLength = typeWriter.getWidth(this.config.text);
  }

  stop() {
    if (this.config.marquee) {
      clearInterval(this.interval);
    }
  }
}

module.exports = TextMacro;
