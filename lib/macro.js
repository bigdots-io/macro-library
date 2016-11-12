"use strict";

var DotGenerator = require('dot-generator');

class Macro {
  constructor({config, dimensions, db, callbacks}) {
    this.dimensions = dimensions;
    this.db = db;
    this.callbacks = callbacks;

    this.originalConfig = config;

    this.config = this.defaultConfig();

    for(var attr in config) {
      this.config[attr] = config[attr];
    }

    this.dotGenerator = new DotGenerator();

    if(!this.constructor.identifier) {
      throw new Error("A macro is missing it's class identifier function");
    } else {
      if(!this.start) {
        throw new Error(`${this.identifier()} did not implement a start method`);
      }

      if(!this.stop) {
        throw new Error(`${this.identifier()} did not implement a stop method`);
      }
    }
  }

  defaultConfig() {
    return {};
  }

  setColor(color) {
    var height = this.dimensions.height,
        width = this.dimensions.width;

    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        this.callbacks.onPixelChange(y, x, color);
      }
    }
  }
}

module.exports = Macro;
