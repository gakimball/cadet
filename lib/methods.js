Meteor.methods({
  setEngineeringControl: function(control, value) {
    if (ship.systems[control]) ship.systems[control] = value;
  }
});