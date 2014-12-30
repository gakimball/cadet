Physics = function(canvasId) {
  var gravity = new b2Vec2(0, 0);
  this.world = new b2World(gravity, true);
  this.scale = 20;
  this.dtRemaining = 0;
  this.stepAmount = 1/30;
  this.removalQueue = [];
}

Physics.prototype = {
  destroy: function() {
    for (var i; i < this.removalQueue.length; i++) {
      this.world.DestroyBody(this.removalQueue[i]);
    }
    this.removalQueue = [];
  },
  step: function(drawTime) {
    this.dtRemaining += drawTime;
    while (this.dtRemaining > this.stepAmount) {
      this.dtRemaining -= this.stepAmount;
      this.world.Step(this.stepAmount, 8, 3);
    }
  }
}