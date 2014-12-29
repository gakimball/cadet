Meteor.startup(function () {
  Bodies.remove({});
  game = new Game();
  ship = new Ship();

  Meteor.call('createMap', canvasWidth / game.scale, canvasHeight / game.scale);
});
