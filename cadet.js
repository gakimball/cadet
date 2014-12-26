if (Meteor.isClient) {
  Meteor.startup(function() {
    var game = Game('canvas', true);

    new Body(game, {
      type: 'static', x: 0, y: 0, height: 1, width: 1
    });
    new Body(game, {
      x: 5, y: 5, height: 1, width: 1
    })
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
