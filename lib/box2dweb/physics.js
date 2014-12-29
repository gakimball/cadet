Physics = function(canvasId) {
  var gravity = new b2Vec2(0, 0);
  this.world = new b2World(gravity, true);
  this.scale = 20;
  this.dtRemaining = 0;
  this.stepAmount = 1/30;
}

Physics.prototype = {
  step: function(drawTime) {
    this.dtRemaining += drawTime;
    while (this.dtRemaining > this.stepAmount) {
      this.dtRemaining -= this.stepAmount;
      this.world.Step(this.stepAmount, 8, 3);
    }
  }
}