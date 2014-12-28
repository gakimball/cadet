var walls = function(game, width, height) {
  var draw = function(x, y) {
    new Body(game, {
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
  var game, canvas, ship;

  Meteor.startup(function() {
    game = new Game('canvas', false);
    canvas = document.getElementById('canvas');

    window.setInterval(function() {
      game.draw(canvas);
    }, 1000 / 60);

    ship = new Body(game, {
      color: 'blue', x: 5, y: 5, height: 1, width: 1
    }).body;

    walls(game, canvas.width / game.scale, canvas.height / game.scale);
  });

  var moveShip = function(dir) {
    var speed = 1;
    var impulses = {
      'up':    {x: 0, y: -speed},
      'down':  {x: 0, y: speed},
      'left':  {x: -speed, y: 0},
      'right': {x: speed, y: 0}
    }
    ship.ApplyImpulse(impulses[dir], ship.GetWorldCenter());
  }

  Template.controls.events({
    'click [data-dir]': function(event) {
      moveShip(event.target.getAttribute('data-dir'));
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
