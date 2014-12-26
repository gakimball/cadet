var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

Physics = function(canvasId) {
  var gravity = new b2Vec2(0, 0);
  this.world = new b2World(gravity, true);
  this.element = document.getElementById(canvasId);
  this.context = this.element.getContext('2d');
  this.scale = 20;
  this.dtRemaining = 0;
  this.stepAmount = 1/60;
}

Physics.prototype = {
  step: function(dt) {
    this.dtRemaining += dt;
    while (this.dtRemaining > this.stepAmount) {
      this.dtRemaining -= this.stepAmount;
      this.world.Step(this.stepAmount, 8, 3);
    }
    if (this.debugDraw) {
      this.world.DrawDebugData();
    }
    else {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
   
      var obj = this.world.GetBodyList();
   
      this.context.save();
      this.context.scale(this.scale, this.scale);
      while (obj) {
        var body = obj.GetUserData();
        if (body) {
          body.draw(this.context);
        }
 
        obj = obj.GetNext();
      }
      this.context.restore();
    }
  },
  debug: function() {
    this.debugDraw = new b2DebugDraw();
    this.debugDraw.SetSprite(this.context);
    this.debugDraw.SetDrawScale(this.scale);
    this.debugDraw.SetFillAlpha(0.3);
    this.debugDraw.SetLineThickness(1.0);
    this.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    this.world.SetDebugDraw(this.debugDraw);
  }
}