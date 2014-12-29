var walls = function(game, width, height) {
  var addWall = function(x, y) {
    new Body(game, 'wall'+x+'x'+y, {
      type: 'static', color: 'black', x: x + 0.5, y: y + 0.5, width: 1, height: 1
    });
  }

  for (var w = 0; w < width; w++) {
    for (var h = 0; h < height; h++) {
      // First or last row
      if (h === 0 || h === height - 1) {
        addWall(w, h);
      }
      else {
        if (w === 0 || w === width - 1) {
          addWall(w, h);
        }
      }
    }
  }
}

Meteor.startup(function () {
  Bodies.remove({});
  game = new Game();

  ship = new Body(game, 'ship', {
    color: 'blue', x: 5, y: 5, height: 1, width: 1
  }).body;

  walls(game, canvasWidth / game.scale, canvasHeight / game.scale);
});
