// Back end
var Pizza = function () {
  this.size = "";
  this.toppings = new array;
  this.type = "";
};

Pizza.prototype.Total = function() {
  var total = 0;

  total += this.sizeCost();
  total += this.toppingsCost();

  return total;
};


Pizza.prototype.sizeCost = function() {
  // body...
  return cost;
};

Pizza.prototype.toppingsCost = function() {
  // body...
  return cost;
};

Pizza.prototype.addToppings = function(toppings) {
  this.toppings.push(toppings);
};

Pizza.prototype.removeToppings = function(toppings) {

};


// front end
$(document).ready(function() {

  // user input
 

});