"use strict";

var Macro = require('./macro');

const identifier = 'text';

class TextMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  defaultConfig() {
    return {
      color: '#FFFFFF',
      font: 'system-6',
      text: 'HELLO WORLD!',
      alignment: 'left'
    };
  }

  start() {
    this.setColor('#000000');

    var result = this.dotGenerator.text({
      text: this.config.text,
      font: this.config.font,
      color: this.config.color,
      alignment: this.config.alignment,
      width: this.dimensions.width,
      height: this.dimensions.height
    });

    result.dots.forEach((dot) => {
      this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
    });
  }

  stop() {
    // Nothing
  }
}

module.exports = TextMacro;
