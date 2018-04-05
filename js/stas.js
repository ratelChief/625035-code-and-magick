'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var LABEL_X = CLOUD_X + GAP;
var LABEL_Y = CLOUD_Y + GAP + FONT_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  if (arr.length > 0) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  }
  return null;
};

var drawHistogramBar = function (ctx, time, name, maxTime, i) {
  var otherPlayersColor = 'rgba(0, 0, 255, ' + Math.random() + ')';
  if (name === 'Вы') {
    ctx.fillStyle = PLAYER_BAR_COLOR;
    ctx.fillRect(CLOUD_X + GAP + FONT_GAP + (GAP + BAR_WIDTH * 2) * i, CLOUD_HEIGHT - GAP - FONT_GAP, BAR_WIDTH, Math.floor((-MAX_BAR_HEIGHT * time) / maxTime));
  } else {
    ctx.fillStyle = otherPlayersColor;
    ctx.fillRect(CLOUD_X + GAP + FONT_GAP + (GAP + BAR_WIDTH * 2) * i, CLOUD_HEIGHT - GAP - FONT_GAP, BAR_WIDTH, Math.floor((-MAX_BAR_HEIGHT * time) / maxTime));
  }
};

var drawTime = function (ctx, time, maxTime, i) {
  ctx.fillStyle = '#000';
  ctx.fillText(Math.floor(time), CLOUD_X + GAP + FONT_GAP + (GAP + BAR_WIDTH * 2) * i, CLOUD_HEIGHT - GAP - FONT_GAP - Math.floor((MAX_BAR_HEIGHT * time) / maxTime) - FONT_GAP);
};

var drawName = function (ctx, name, i) {
  ctx.fillStyle = '#000';
  ctx.fillText(name, CLOUD_X + GAP + FONT_GAP + (GAP + BAR_WIDTH * 2) * i, CLOUD_HEIGHT - GAP - GAP);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  var maxTime = getMaxElement(times);
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', LABEL_X, LABEL_Y);
  ctx.fillText('Список результатов:', LABEL_X, LABEL_Y + FONT_GAP);
  for (var i = 0; i < names.length; i++) {
    drawHistogramBar(ctx, times[i], names[i], maxTime, i);
    drawTime(ctx, times[i], maxTime, i);
    drawName(ctx, names[i], i);
  }
};
