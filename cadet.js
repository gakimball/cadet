Bodies = new Mongo.Collection('bodies');
var canvasWidth = 400;
var canvasHeight = 300;
var canvasScale = 20;

var walls = function(game, width, height) {
  var draw = function(x, y) {
    new Body(game, 'wall'+x+'x'+y, {
      type: 'static', color: 'black', x: x + 0.5, y: y + 0.5, width: 1, height: 1
    });
  }

  for (var w = 0; w < width; w++) {
    for (var h = 0; h < height; h++) {
      // First or last row
      if (h === 0 || h === height - 1) {
        draw(w, h);
      }
      else {
        if (w === 0 || w === width - 1) {
          draw(w, h);
        }
      }
    }
  }
}

if (Meteor.isClient) {
  var draw = function(canvas, bodies) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.scale(canvasScale, canvasScale);

    bodies.forEach(function(body) {
      context.save();
      context.translate(body.x, body.y);
      context.rotate(body.angle);

      if (body.color) {
        context.fillStyle = body.color;

        switch (body.shape) {
          case "block":
            context.fillRect(-body.width / 2, -body.height / 2, body.width, body.height);
            break;
          case "circle":
            context.beginPath();
            context.arc(0, 0, body.radius, 0, Math.PI * 2);
            context.fill();
            break;
          // case "polygon":
          //   var points = this.details.points;
          //   context.beginPath();
          //   context.moveTo(points[0].x, points[0].y);
          //   for (var i = 1; i < points.length; i++) {
          //     context.lineTo(points[i].x, points[i].y);
          //   }
          //   context.fill();
          //   break;
          default:
            break;
        }
      }

      if (body.image) {
        context.drawImage(this.details.image, -this.details.width / 2, -this.details.height / 2,
        this.details.width,
        this.details.height);
      }

      context.restore();
    });

    context.restore();
  }

  Meteor.startup(function() {
    canvas = document.getElementById('canvas');

    window.setInterval(function() {
      draw(canvas, Bodies.find({}));
    }, 1000 / 60);
  });

  var moveShip = function(dir) {
    var speed = 1;
    var impulses = {
      'up':    {x: 0, y: -speed},
      'down':  {x: 0, y: speed},
      'left':  {x: -speed, y: 0},
      'right': {x: speed, y: 0}
    }
    console.log(ship);
    ship.ApplyImpulse(impulses[dir], ship.GetWorldCenter());
  }

  Template.controls.events({
    'click [data-dir]': function(event) {
      moveShip(event.target.getAttribute('data-dir'));
    }
  });
}

var ship;

if (Meteor.isServer) {
  var game;

  Meteor.startup(function () {
    game = new Game();

    ship = new Body(game, 'ship', {
      color: 'blue', x: 5, y: 5, height: 1, width: 1
    }).body;

    walls(game, canvasWidth / game.scale, canvasHeight / game.scale);

    Bodies.remove({});
  });
}

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
