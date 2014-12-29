Ship = function(x, y) {
  this.body = new Body(game, 'ship', {
    color: 'blue', x: x || 5, y: y || 5, height: 1, width: 1
  }).body;
}

Ship.prototype = {
  thrust: function(dir) {
    var speed = SHIP_THRUST_SPEED;
    var impulses = {
      'up':    {x: 0, y: -speed},
      'down':  {x: 0, y: speed},
      'left':  {x: -speed, y: 0},
      'right': {x: speed, y: 0}
    }
    this.body.ApplyImpulse(impulses[dir], this.body.GetWorldCenter());
  }
}