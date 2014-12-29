var draw = function(canvas, bodies) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.scale(canvasScale, canvasScale);

  for (var i = 0; i < bodies.length; i++) {
    var body = bodies[i];

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
  };

  context.restore();
}

Meteor.startup(function() {
  canvas = document.getElementById('canvas');

  window.setInterval(function() {
    draw(canvas, Bodies.findOne({id: 0}).bodies);
  }, 1000 / 30);
});

Template.controls.events({
  'click [data-dir]': function(event) {
    Meteor.call('moveShip', event.target.getAttribute('data-dir'));
  }
});
