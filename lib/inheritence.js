// Wrapper function to create basic inheritence for JavaScript objects.
// Thank you: http://phrogz.net/JS/classes/OOPinJS2.html

// Usage:
// var Mammal = function() { }
// var Cat = function() { }
// Cat.inheritsFrom(Mammal);

Function.prototype.inheritsFrom = function(parentClassOrObject){ 
  if ( parentClassOrObject.constructor == Function ) {
    // Normal inheritance 
    this.prototype = new parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject.prototype;
  }
  else {
    // Virtual inheritance 
    this.prototype = parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject;
  }
  return this;
}