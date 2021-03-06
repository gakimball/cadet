Meteor.methods({
  draw: function(bodies) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.save();
    context.scale(CANVAS_SCALE, CANVAS_SCALE);

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
        context.drawImage(
          this.details.image,
          -this.details.width / 2,
          -this.details.height / 2,
          this.details.width,
          this.details.height
        );
      }

      context.restore();
    };

    context.restore();
  }
})