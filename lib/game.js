Game = function(canvasId, debug) {
  var physics;
  var fps = 30;

  var run = function() {
    physics.world.Step(1/fps, 8, 3);
    Meteor.call('updateBodies');
  };

  physics = new Physics();
  Meteor.setInterval(run, 1000 / fps);
  return physics;
}
