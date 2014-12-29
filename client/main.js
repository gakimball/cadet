Meteor.startup(function() {
  canvas = document.getElementById('canvas');
  thrustInterval = null;

  window.setInterval(function() {
    try {
      Meteor.call('draw', Bodies.findOne({id: 0}).bodies);
    }
    catch (e) {}
  }, 1000 / GAME_FRAMERATE);
});

Template.navigationControls.helpers({
  shipinfo: function() {
    return Bodies.findOne({id: 1});
  }
});

Template.navigationControls.events({
  'mousedown [data-dir]': function(event) {
    var direction = event.target.getAttribute('data-dir');
    
    Meteor.call('moveShip', direction);
    thrustInterval = window.setInterval(function() {
      Meteor.call('moveShip', direction);
    }, SHIP_THRUST_FREQ);
  },
  'mouseup [data-dir]': function(event) {
    window.clearInterval(thrustInterval);
  }
});
