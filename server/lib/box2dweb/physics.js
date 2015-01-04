Physics = function(canvasId) {
  var gravity = new b2Vec2(0, 0);
  this.world = new b2World(gravity, true);
  this.removalQueue = [];

  this.collisionSetup();
}

Physics.prototype = {
  collisionSetup: function() {
    var _this = this;
    this.collisionListener = new Box2D.Dynamics.b2ContactListener();
    this.collisionListener.PostSolve = function (contact, impulse) {
      var bodyA = contact.GetFixtureA().GetBody().GetUserData(),
          bodyB = contact.GetFixtureB().GetBody().GetUserData();

      if (bodyA.name === 'bullet') {
        _this.destroy(bodyA);
      }
      if (bodyA.name === 'ship') {
        ship.damage(10);
      }
    }
    this.world.SetContactListener(this.collisionListener);
  },
  destroy: function(body) {
    this.removalQueue.push(body.body);
  },
  destroyAll: function() {
    for (var i = 0; i < this.removalQueue.length; i++) {
      this.world.DestroyBody(this.removalQueue[i]);
    }
    this.removalQueue = [];
  }
}