// Collections
Bodies = new Mongo.Collection('bodies');

// Game objects
ship = null;
game = null;

// Game properties
GAME_FRAMERATE = 30;

// HTML canvas properties
CANVAS_WIDTH = 400;
CANVAS_HEIGHT = 300;
CANVAS_SCALE = 20;

// Ship properties
SHIP_THRUST_SPEED = 1;
SHIP_THRUST_FREQ = 1000;
SHIP_BULLET_SPEED = 2;

// Shortcuts to common Box2D components
b2Vec2 = Box2D.Common.Math.b2Vec2;
b2BodyDef = Box2D.Dynamics.b2BodyDef;
b2Body = Box2D.Dynamics.b2Body;
b2Filter = Box2D.Dynamics.b2FilterData;
b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
b2Fixture = Box2D.Dynamics.b2Fixture;
b2World = Box2D.Dynamics.b2World;
b2MassData = Box2D.Collision.Shapes.b2MassData;
b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
