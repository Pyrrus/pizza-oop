// Back end
var Pizza = function () {
  this.size = "";
  this.toppings = "";
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

  output += "<br />toppings: " + this.toppings;

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

  var holder = this.toppings.split(",");

  console.log(holder);

  if (holder.length >= 3) {
    return (.50 * (this.length - 2))
  } else {
    return 0;
  }
};

Pizza.prototype.addToppings = function(toppings) {
    this.toppings += toppings + ",";
};

Pizza.prototype.removeToppings = function(toppings) {
  this.toppings = this.toppings.replace(toppings + ",", "");
};

var pie = [];

var at = -1;

// front end

var frontDisplay = function () {
  var total = 0;
  $(".remove").remove();
  for (var i = 0; i < pie.length; i++) {
        $("#orderINFO").append("<li class='remove'><h5>Pizza " + (i + 1) + ":</h5>" + pie[i].display() + "</li>");
        total += pie[i].Total();
  }
  $("#total").text("$" + total);
}

$(document).ready(function() {

  $("#add").click(function() {
    $(".make").show();
    var makePie = new Pizza;
    makePie.size = "small";
    pie.push(makePie);
    frontDisplay();
    at++;
  });

   $("input:radio").click(function() {
    if (this.checked) {
      pie[at].size = $(this).val();
      frontDisplay();
    }
  });

   $("input:checkbox").click(function() {
    if (this.checked) {
      pie[at].addToppings($(this).val());
    } else {
      pie[at].removeToppings($(this).val());
    }

    frontDisplay();
  });
 

});