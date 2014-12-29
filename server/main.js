Meteor.startup(function () {
  Bodies.remove({});
  game = new Game();

  ship = new Body(game, 'ship', {
    color: 'blue', x: 5, y: 5, height: 1, width: 1
  }).body;

  Meteor.call('createMap', canvasWidth / game.scale, canvasHeight / game.scale);
});
