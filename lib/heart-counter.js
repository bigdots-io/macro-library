"use strict";

var Macro = require('./macro');
var TypeWriter = require('typewriter');

var heartCoordinates = [
  {x: 5, y: 1}, {x: 6, y: 1}, {x: 7, y: 1}, {x: 8, y: 1}, {x: 12, y: 1}, {x: 13, y: 1}, {x: 14, y: 1}, {x: 15, y: 1},
  {x: 4, y: 2}, {x: 5, y: 2}, {x: 6, y: 2}, {x: 7, y: 2}, {x: 8, y: 2}, {x: 9, y: 2}, {x: 11, y: 2}, {x: 12, y: 2}, {x: 13, y: 2}, {x: 14, y: 2}, {x: 15, y: 2}, {x: 16, y: 2},
  {x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}, {x: 6, y: 3}, {x: 7, y: 3}, {x: 8, y: 3}, {x: 9, y: 3}, {x: 10, y: 3}, {x: 11, y: 3}, {x: 12, y: 3}, {x: 13, y: 3}, {x: 14, y: 3}, {x: 15, y: 3}, {x: 16, y: 3}, {x: 17, y: 3},
  {x: 3, y: 4}, {x: 4, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}, {x: 7, y: 4}, {x: 8, y: 4}, {x: 9, y: 4}, {x: 10, y: 4}, {x: 11, y: 4}, {x: 12, y: 4}, {x: 13, y: 4}, {x: 14, y: 4}, {x: 15, y: 4}, {x: 16, y: 4}, {x: 17, y: 4},
	{x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 8, y: 5}, {x: 9, y: 5}, {x: 10, y: 5}, {x: 11, y: 5}, {x: 12, y: 5}, {x: 13, y: 5}, {x: 14, y: 5}, {x: 15, y: 5}, {x: 16, y: 5}, {x: 17, y: 5},
  {x: 3, y: 6}, {x: 4, y: 6}, {x: 5, y: 6}, {x: 6, y: 6}, {x: 7, y: 6}, {x: 8, y: 6}, {x: 9, y: 6}, {x: 10, y: 6}, {x: 11, y: 6}, {x: 12, y: 6}, {x: 13, y: 6}, {x: 14, y: 6}, {x: 15, y: 6}, {x: 16, y: 6}, {x: 17, y: 6},
  {x: 4, y: 7}, {x: 5, y: 7}, {x: 6, y: 7}, {x: 7, y: 7}, {x: 8, y: 7}, {x: 9, y: 7}, {x: 10, y: 7}, {x: 11, y: 7}, {x: 12, y: 7}, {x: 13, y: 7}, {x: 14, y: 7}, {x: 15, y: 7}, {x: 16, y: 7},
  {x: 4, y: 8}, {x: 5, y: 8}, {x: 6, y: 8}, {x: 7, y: 8}, {x: 8, y: 8}, {x: 9, y: 8}, {x: 10, y: 8}, {x: 11, y: 8}, {x: 12, y: 8}, {x: 13, y: 8}, {x: 14, y: 8}, {x: 15, y: 8}, {x: 16, y: 8},
  {x: 5, y: 9}, {x: 6, y: 9}, {x: 7, y: 9}, {x: 8, y: 9}, {x: 9, y: 9}, {x: 10, y: 9}, {x: 11, y: 9}, {x: 12, y: 9}, {x: 13, y: 9}, {x: 14, y: 9}, {x: 15, y: 9},
  {x: 6, y: 10}, {x: 7, y: 10}, {x: 8, y: 10}, {x: 9, y: 10}, {x: 10, y: 10}, {x: 11, y: 10}, {x: 12, y: 10}, {x: 13, y: 10}, {x: 14, y: 10},
  {x: 7, y: 11}, {x: 8, y: 11}, {x: 9, y: 11}, {x: 10, y: 11}, {x: 11, y: 11}, {x: 12, y: 11}, {x: 13, y: 11},
  {x: 8, y: 12}, {x: 9, y: 12}, {x: 10, y: 12}, {x: 11, y: 12}, {x: 12, y: 12},
  {x: 9, y: 13}, {x: 10, y: 13}, {x: 11, y: 13},
  {x: 10, y: 14}
];

const identifier = 'heart-counter';

class HeartCounterMacro extends Macro {
  static get identifier() {
    return identifier;
  }

  defaultConfig() {
    return {
      loadingBarColor: '#333333',
      iconColor: '#FFFFFF',
      countColor: '#FFFFFF',
      url: '',
      refreshInterval: 60
    };
  }

  start() {
    var config = this.config;

    var height = this.dimensions.height,
        width = this.dimensions.width,
        url = this.config.url,
        iconColor = this.config.iconColor,
        countColor = this.config.counterColor,
        loadingBarColor = this.config.loadingBarColor,
        refreshInterval = this.config.refreshInterval * 1000;

    heartCoordinates.forEach((coordinate) => {
      this.callbacks.onPixelChange(coordinate.y, coordinate.x, iconColor);
    });

    var textArea = new TypeWriter({
      font: 'system-16',
      alignment: 'right',
      startingColumn: 62,
      startingRow: 1,
      hex: countColor
    });

    var totalLikes = 10000;

    var refresh = () => {
      this.loadingBar.start(function() {
        // request.get({
        //   url: URL
        // }, function(error, response, body) {
        //   parsedBody = JSON.parse(body);

          totalLikes += 1;

          // parsedBody.forEach(function(item) {
          //   totalLikes += item.count
          // });

          textArea.write(commafy(totalLikes));
        // });
      });
    }

    this.loadingBar = new LoadingBar(refreshInterval, {
      height: height,
      width: width,
      color: loadingBarColor
    }, this.callbacks);

    this.interval = setInterval(() => {
      refresh();
    }, refreshInterval);

    refresh();
  }

  stop() {
    clearInterval(this.interval);
    this.loadingBar.stop();
  }
}

class LoadingBar {
  constructor(interval, options, callbacks) {
    this.height = options.height;
    this.width = options.width;
    this.color = options.color;
    this.callbacks = callbacks;

    this.speed = (interval / (this.width + 1))
  }

  start(callback) {
    var loadingPosition = 0;

    this.reset();

    this.interval = setInterval(() => {
      if (loadingPosition === (this.width - 1)) {
        callback();
        clearInterval(this.interval);
      }

      this.callbacks.onPixelChange(this.height - 1, loadingPosition, this.color);
      loadingPosition += 1;
    }, this.speed);
  }

  reset() {
    [...Array(this.width).keys()].forEach((x) => {
      this.callbacks.onPixelChange(this.height - 1, x, '#000000');
    });
  }

  stop() {
    clearInterval(this.interval);
  }
}

function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

module.exports = HeartCounterMacro;
