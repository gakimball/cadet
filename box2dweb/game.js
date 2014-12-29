Game = function(canvasId, debug) {
  var physics;
  var fps = 60;

  var run = (function() {
    var loops = 0
    var skipTicks = 1000 / fps;
    var maxFrameSkip = 10;
    var nextGameTick = new Date().getTime();

    return function() {
      loops = 0;
      
      while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
        physics.world.Step(1/fps, 8, 3)
        nextGameTick += skipTicks;
        loops++;
      }

      Meteor.call('updateBodies');
    }
  })();

  physics = new Physics();
  Meteor.setInterval(run, 0);
  return physics;
}
