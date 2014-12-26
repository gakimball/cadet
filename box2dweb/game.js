Game = function(canvasId, debug) {
  var physics, lastFrame = new Date().getTime();
  var gameLoop = function() {
    var time = new Date().getTime();
    requestAnimationFrame(gameLoop);
    var drawTime = (time - lastFrame) / 1000;
    if(drawTime > 1/15) { drawTime = 1/15; }
    physics.step(drawTime);
    lastFrame = time;
  }

  var physics = new Physics(canvasId);
  if (debug) physics.debug();
  requestAnimationFrame(gameLoop);
  return physics;
}
