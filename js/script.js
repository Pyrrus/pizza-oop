// Back end

// pizza object
var Pizza = function () {
  this.size = "";
  this.toppings = [];
};

// get the total cost for size 
// and toppings
Pizza.prototype.Total = function() {
  var total = 0;

  total += this.sizeCost();
  total += this.toppingsCost();

  return total;
};

// set the output for the both size
// and topping.
Pizza.prototype.display = function() {
  var output = "Size: ";

  output += this.size;

  output += "<br />Toppings: " + this.toppings.toString();;

  return output;
}

// return the cost of the pizza size
Pizza.prototype.sizeCost = function() {
  if (this.size === "small") {
    return 8;
  } else if (this.size === "medium") {
    return 10
  } else {
    return 12;
  }
  
};

// return the cost of the toppings cost.
// the first two will be free.
Pizza.prototype.toppingsCost = function() {
  if (this.toppings.length >= 3) {
    return (0.50 * (this.toppings.length - 2));
  } else {
    return 0;
  }
};

// add topping 
Pizza.prototype.addToppings = function(toppings) {
    this.toppings.push(toppings);
};

// remove topping 
Pizza.prototype.removeToppings = function(toppings) {
  for (var i = 0; i < this.toppings.length; i++) {
    if (this.toppings[i] === toppings) {
      this.toppings.splice(i, 1);
    }
  }
  
};

// set goble array to help keep track
// the pizza object
var pie = [];

// this will help what area in the array
// to get the data.
var at = 0;

// front end

// make the display to edit the front end 
// with data
var frontDisplay = function () {
  var total = 0;
  $(".remove").remove();
  $(".pizza").text((parseInt(at) + 1));
  for (var i = 0; i < pie.length; i++) {
    $("#orderINFO").append("<li class='remove'><h5>Pizza " + (i + 1) 
          + ":</h5>" + pie[i].display() + "</li>");
    total += pie[i].Total();
  }
  $("#total").text("$" + total);
}

// make the like to view the 
// pizza and remove pizza
var makeLink = function () {
  $(".linkRemove").remove();
 for (var i = 0; i < pie.length; i++) {
      $("#list").append("<li class='linkRemove'><button class='btn btn-info showData' value=" 
        + i + ">Pizza " + (i + 1) + "</button><button class='btn btn-warning removeData' value=" 
        + i + ">remove Pizza" + (i + 1) + "</button></li>");
  }
  
  $(".showData").unbind();
  $(".showData").click(function() {
    at = $(this).val();
    var findTopping = pie[at].toppings;

    // reset the checkbox
    $("input:checkbox").prop('checked',false);

    for (var i = 0; i < findTopping.length; i++) {
      // set checkbox by the topping
      $("input[type=checkbox][value='" + findTopping[i] + "']").prop("checked",true);
    }

    // set the size by the size of the pizza
    $("input[type=radio][value='" + pie[at].size + "']").prop("checked",true);
    $(".make").show();
    frontDisplay();
  }); 

  $(".removeData").unbind();
  $(".removeData").click(function() {
    // set at to know where to remove data
    at = $(this).val();

    // set the unchecked to both checkbox and radio
    $("input:checkbox").prop('checked',false);
    $("input:radio").prop("checked",false);

    // remove from the array and delete object
    var data = pie[at];
    pie.splice(at, 1);
    delete data;

    // call the makeLink to reset the buttons order
    makeLink();

    $(".make").hide();

    frontDisplay();
    
  });

};


$(document).ready(function() {

  // set the add and make object to array. 
  $("#add").click(function() {
    $(".make").show();
    var makePie = new Pizza;
    makePie.size = "small";
    pie.push(makePie);

    at = pie.length - 1;
    
    makeLink();
    $("input:checkbox").prop('checked',false);
    $("input[type=radio][value='small']").prop("checked",true);
    frontDisplay();
  });

  // when the user click the radio tag
  // will set the size to the pizza
  $("input:radio").click(function() {
    if (this.checked) {
      pie[at].size = $(this).val();
      frontDisplay();
    }
  });

  // add and remove topping when the user click
  // on the checkbox
   $("input:checkbox").click(function() {
    if (this.checked) {
      pie[at].addToppings($(this).val());
    } else {
      pie[at].removeToppings($(this).val());
    }
    frontDisplay();
  });

});