'use strict';

(function () {
  var WINDOW_WIDTH = 420;
  var WINDOW_HEIGHT = 270;
  var WINDOW_X = 100;
  var WINDOW_Y = 10;
  var GAP = 10;
  var FONT_GAP = 20;
  var COL_WIDTH = 40;
  var COL_HEIGHT = 150;
  var COL_GAP = 50;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, WINDOW_WIDTH, WINDOW_HEIGHT);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, WINDOW_X + GAP, WINDOW_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, WINDOW_X, WINDOW_Y, 'white');

    ctx.fillStyle = 'black';
    ctx.font = '16px \'PT Mono\'';
    ctx.fillText('Ура вы победили!', WINDOW_X + FONT_GAP, 2 * FONT_GAP);
    ctx.fillText('Список результатов:', WINDOW_X + FONT_GAP, 3 * FONT_GAP);

    var maxTime = times.reduce(function (acc, value) {
      return acc > value ? acc : value;
    }, 0);

    names.forEach(
        function (player, index) {
          ctx.fillStyle = 'black';
          ctx.fillText(player, (WINDOW_X + FONT_GAP) + (COL_WIDTH + COL_GAP) * index, WINDOW_HEIGHT);

          ctx.fillText(Math.round(times[index]), (WINDOW_X + FONT_GAP) + (COL_WIDTH + COL_GAP) * index,
              (WINDOW_HEIGHT - FONT_GAP - GAP) - (times[index] * COL_HEIGHT / maxTime));

          ctx.fillStyle = 'rgba(0, 0, 255,' + (Math.random() * (1 - 0.1) + 0.1) + ')';

          if (player === 'Вы') {
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
          }

          ctx.fillRect((WINDOW_X + FONT_GAP) + (COL_WIDTH + COL_GAP) * index,
              (WINDOW_HEIGHT - FONT_GAP) - (times[index] * COL_HEIGHT / maxTime), COL_WIDTH, times[index] * COL_HEIGHT / maxTime);
        });
  };
})();
