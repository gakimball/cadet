Ship = function(x, y) {
  this.body = new Body(game, 'ship', {
    color: 'blue', x: x || 5, y: y || 5, height: 1, width: 1, index: -1
  }).body;
  this.health = SHIP_MAX_HEALTH;
  this.fuel   = SHIP_MAX_FUEL;
  this.systems = {
    thrusters: 3,
    shields: 3,
    weapons: 3
  }
}

Ship.prototype = {
  thrust: function(dir) {
    var speed = SHIP_THRUST_SPEED * (this.systems.thrusters / 3);
    var impulses = {
      'up':    {x: 0, y: -speed},
      'down':  {x: 0, y: speed},
      'left':  {x: -speed, y: 0},
      'right': {x: speed, y: 0}
    }
    this.body.ApplyImpulse(impulses[dir], this.body.GetWorldCenter());
    this.fuel--;
  },
  damage: function(amt) {
    this.health -= amt;
    if (this.health < 0) {
      this.health = 0;
      this.die();
    }
  },
  heal: function(amt) {
    this.health += amt;
    if (this.health > SHIP_MAX_HEALTH) {
      this.health = SHIP_MAX_HEALTH;
    }
  },
  die: function() {
    
  }
}