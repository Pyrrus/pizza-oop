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

  if (holder.length >= 3) {
    return (0.50 * (holder.length - 2));
  } else {
    return 0;
  }
};

Pizza.prototype.addToppings = function(toppings) {
    if (this.toppings === "")
      this.toppings += toppings;
    else
      this.toppings += "," + toppings;
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
  $(".pizza").text(at + 1);
  for (var i = 0; i < pie.length; i++) {
    $("#orderINFO").append("<li class='remove'><h5>Pizza " + (i + 1) 
          + ":</h5>" + pie[i].display() + "</li>");
    total += pie[i].Total();
  }
  $("#total").text("$" + total);
}

var makeLink = function () {
  $("#list").append("<li class='linkRemove'><button class='btn btn-info link' value=" 
    + at + ">Pizza " + (at + 1) + "</button></li>");

  $(".link").click(function() {
    at = $(this).val();

    var findTopping = pie[at].toppings.split(",");

    for (var i = 0; i < findTopping.length; i++) {
      $("input[type=checkbox][value='" + findTopping[i] + "']").prop("checked",true);
    }

    $("input[type=radio][value='" + pie[at].size + "']").prop("checked",true);

    frontDisplay();

  }); 

};

$(document).ready(function() {

  $("#add").click(function() {
    $(".make").show();
    var makePie = new Pizza;
    makePie.size = "small";
    pie.push(makePie);
    at++;
    makeLink();
    frontDisplay();
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