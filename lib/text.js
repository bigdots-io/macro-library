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
      alignment: 'left',
      width: this.dimensions.width,
      height: this.dimensions.height
    };
  }

  start() {
    this.setColor('#000000');

    var dots = dotGenerator.text({
      text: this.config.text,
      font: this.config.font,
      hex: this.config.color,
      alignment: this.config.alignment,
      width: this.config.width,
      height: this.config.height
    });

    dots.forEach((dot) => {
      this.callbacks.onPixelChange(dot.y, dot.x, this.config.color);
    });
  }

  stop() {
    // Nothing
  }
}

module.exports = TextMacro;
