Meteor.startup(function () {
  Bodies.remove({});
  game = new Game();
  ship = new Ship();

  Meteor.call('createMap', CANVAS_WIDTH / CANVAS_SCALE, CANVAS_HEIGHT / CANVAS_SCALE);
});
