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

    dotGenerator.image({ url: url }, {
      onSuccess: function(dots) {
        dots.forEach(function(dot) {
          onPixelChange(dot.y, dot.x, dot.hex);
        });
      }
    });
  }

  stop() {
    // Nothing...
  }
}

module.exports = ImageMacro;
