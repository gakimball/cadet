Game = function(canvasId, debug) {
  var physics;

  var run = function() {
    physics.world.Step(1/GAME_FRAMERATE, 8, 3);
    physics.destroy();
    Meteor.call('updateBodies');
    Meteor.call('updateShipInfo');
  };

  physics = new Physics();
  Meteor.setInterval(run, 1000 / GAME_FRAMERATE);
  return physics;
}
