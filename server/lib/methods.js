Meteor.methods({
  createMap: function(width, height) {
    var addWall = function(x, y) {
      new Body(game, 'wall', {
        type: 'static', color: 'black', x: x + 0.5, y: y + 0.5, width: 1, height: 1
      });
    }

    for (var w = 0; w < width; w++) {
      for (var h = 0; h < height; h++) {
        // First or last row
        if (h === 0 || h === height - 1) {
          addWall(w, h);
        }
        // Middle rows
        else {
          if (w === 0 || w === width - 1) {
            addWall(w, h);
          }
        }
      }
    }
  },
  updateBodies: function() {
    var bodies = [];
    var obj = game.world.GetBodyList();
    while (obj) {
      var body = obj.GetUserData();
      if (body) {
        var id = body.id;
        var bodyInfo = {
          x: body.body.GetPosition().x,
          y: body.body.GetPosition().y,
          angle: body.body.GetAngle(),
          shape: body.details.shape,
          width: body.details.width,
          height: body.details.height,
          color: body.details.color || 'black',
          image: body.details.image || null
        }
        bodies.push(bodyInfo);
      }
      obj = obj.GetNext();
    }
    Bodies.update('bodies', {$set: {id: 0, bodies: bodies}}, {upsert: true});
  },
  updateShipInfo: function() {
    var velocity = ship.body.GetLinearVelocity();
    var angle    = ship.body.GetAngle();
    var data     = {
      id: 1,
      health: ship.health,
      fuel: ship.fuel,
      speed: velocity.Length().toFixed(2),
      angle: angle.toFixed(0)
    }

    Bodies.update('shipInfo', {$set: data}, {upsert: true});
  },
  moveShip: function(dir) {
    if (ship.fuel > 0) {
      ship.thrust(dir);
    }
  },
  fire: function(dir) {
    if (ship.fuel === 0) return;

    ship.fuel--;
    var speed = SHIP_BULLET_SPEED;
    var shipCenter = ship.body.GetWorldCenter();
    var impulses = {
      'up':    {x: 0, y: -speed},
      'down':  {x: 0, y: speed},
      'left':  {x: -speed, y: 0},
      'right': {x: speed, y: 0}
    }

    var bullet = new Body(game, 'bullet', {
      bullet: true, color: 'green', x: shipCenter.x, y: shipCenter.y, width: 0.5, height: 0.5, index: -1
    }).body;
    bullet.ApplyImpulse(impulses[dir], bullet.GetWorldCenter());
  }
});
