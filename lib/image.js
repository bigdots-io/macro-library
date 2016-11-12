"use strict";

var Macro = require('./macro');

const identifier = 'image';

class ImageMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  defaultConfig() {
    return {
      url: '',
    };
  }

  start() {
    var url = this.config.url;

    this.dotGenerator.image(url, {
      onSuccess: (dots) => {
        dots.forEach((dot) => {
          this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
        });
      }
    });
  }

  stop() {
    // Nothing...
  }
}

module.exports = ImageMacro;
