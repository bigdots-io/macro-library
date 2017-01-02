"use strict";

var Macro = require('./macro');

const identifier = 'meteor-shower';

class MeteorShowerMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  defaultConfig() {
    return {
      color: '#FFFFFF',
      meteorCount: 30,
      maxTailLength: 20,
      minTailLength: 5,
      minSpeed: 100,
      maxSpeed: 10
    };
  }

  start() {
    var meteors = [];

    var generateMeteor = () => {
      return {
        tailLength: Math.floor(Math.random() * (this.config.maxTailLength - this.config.minTailLength)) + this.config.minTailLength,
        speed: Math.floor(Math.random() * (this.config.minSpeed - this.config.maxSpeed)) + this.config.maxSpeed,
        moveCount: 0,
        complete: false,
        path: []
      }
    }

    for(let i = 0; i < this.config.meteorCount; i++) {
      meteors.push(generateMeteor());
    }

    this.interval = setInterval(() => {
      meteors = meteors.filter(function(meteor) {
        return meteor.complete == false;
      });

      for(let i = meteors.length; i < this.config.meteorCount; i++) {
        meteors.push(generateMeteor());
      }

      meteors.forEach((meteor, i) => {
        meteors[i].moveCount += 10;

        if(meteors[i].moveCount > meteor.speed) {
          meteors[i].moveCount = 0;
          var shades = generateColorShade(this.config.color, meteor.tailLength);

          if(meteor.path.length == 0) {
            meteors[i].path.push({
              x: Math.floor(Math.random() * ((this.dimensions.width + this.dimensions.height) - 0)) + 0,
              y: 0,
            });
          } else if((this.dimensions.height + meteor.tailLength) > (meteor.path[0].y)) {
            meteors[i].path.unshift({x: meteor.path[0].x - 1, y: meteor.path[0].y + 1});
          } else {
            meteors[i].complete = true
          }

          meteor.path.forEach((dot, i) => {
            if(shades.length > i) {
              this.callbacks.onPixelChange(dot.y, dot.x, shades[i]);
            } else {
              this.callbacks.onPixelChange(dot.y, dot.x, '#000000');
            }
          });
        }
      });
    }, 10)
  }

  stop() {
    clearInterval(this.interval);
  }
}

function generateColorShade(seedColor, length) {
  var colors = [],
      interval = 1 / length;

  colors.push(colorLuminance(seedColor, 0))

  for(let i = interval; i < 1; i = i + interval) {
    colors.push(colorLuminance(seedColor, -i))
  }

  return colors;
}

function colorLuminance(hex, lum) {
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	return rgb;
}

module.exports = MeteorShowerMacro;
