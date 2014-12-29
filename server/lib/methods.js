Meteor.methods({
  updateBodies: function() {
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
        Bodies.update(id, {$set: bodyInfo}, {upsert: true});
      }
      obj = obj.GetNext();
    }
  },
  moveShip: function(dir) {
    var speed = 1;
    var impulses = {
      'up':    {x: 0, y: -speed},
      'down':  {x: 0, y: speed},
      'left':  {x: -speed, y: 0},
      'right': {x: speed, y: 0}
    }
    ship.ApplyImpulse(impulses[dir], ship.GetWorldCenter());
  }
});
