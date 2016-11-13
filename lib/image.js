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
      speed: 10
    };
  }

  start() {
    var url = this.config.url;
    this.currentFrame = 0;

    this.dotGenerator.image(url, {
      onSuccess: (response) => {

          this.interval = setInterval(() => {
            this.currentFrame++;

            if(this.currentFrame >= data.length) {
              this.currentFrame = 0;
            }

            response.data[this.currentFrame].forEach((dot) => {
              this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
            });
          }, this.config.speed);

          // data.forEach((dot) => {
          //   this.callbacks.onPixelChange(dot.y, dot.x, dot.hex);
          // });
      }
    });
  }

  stop() {
    if(this.internal) {
      clearInterval(this.interval);
    }
  }
}

module.exports = ImageMacro;
