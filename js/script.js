// Back end
var Pizza = function () {
  this.size = "";
  this.toppings = [];
};

Pizza.prototype.Total = function() {
  var total = 0;

  total += this.sizeCost();
  total += this.toppingsCost();

  return total;
};

Pizza.prototype.display = function() {
  var output = "Size: ";

  output += this.size;

  output += "<br />toppings: ";

  output += this.toppings.toString()

  return output;
}


Pizza.prototype.sizeCost = function() {
  if (this.size === "small") {
    return 8;
  } else if (this.size === "medium") {
    return 10
  } else {
    return 12;
  }
  
};

Pizza.prototype.toppingsCost = function() {
  if (this.toppings.length >= 3) {
    return (.50 * (this.length - 2))
  } else {
    return 0;
  }
};

Pizza.prototype.addToppings = function(toppings) {
  this.toppings.push(toppings);
};

Pizza.prototype.removeToppings = function(toppings) {

};

var pie = [];

var at = 0;

// front end
$(document).ready(function() {

  $("#add").click(function() {
    $(".make").show();
    var makePie = new Pizza;
    makePie.size = "small";
    makePie.addToppings("Monterey Jack");
    var total = 0;
    pie.push(makePie);
    $(".remove").remove();
    for (var i = 0; i < pie.length; i++) {
      $("#orderINFO").append("<li class='remove'><h5>Pizza " + (i + 1) + ":</h5>" + pie[i].display() + "</li>");
      total += pie[i].Total();
    }

    at++;

    $("#total").text("$" + total);
    
  });
 

});