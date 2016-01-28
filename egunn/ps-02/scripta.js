
var canvas = document.getElementById("canvas").getContext("2d");

/*
//create triangle constructor function
var fillTriangle = function() {
//move cursor without drawing a line
    canvas.moveTo(50,50);
//draw a line to 
    canvas.lineTo(75, 75);
    canvas.lineTo(25, 75);
    canvas.fill();
}; */
//canvas.fillStyle = "#000000";
//fillTriangle(66,66,66,66);


/////////////////////////////////////////////////////////////////////////////////
var canvas = document.getElementById("canvas").getContext("2d");

//from sample code
var setColor = function (hue, sat, light, alpha) {
  var colorString = "hsla("
    + hue   + ", "
    + sat   + "%, "
    + light + "%, "
    + alpha + ")";
  canvas.fillStyle = colorString;
};

var fillTriangle = function(xCenter, yCenter,diameter) {
  //var diameter = 24;
  var radius = diameter/2;
  var topOfTriangle = yCenter + radius;
  var bottomOfTriangle = topOfTriangle - radius;
  var left = xCenter - radius;
  var right = xCenter + radius;
  canvas.moveTo(xCenter, topOfTriangle);
  canvas.lineTo(right, bottomOfTriangle);
  canvas.lineTo(left, bottomOfTriangle);
  canvas.fill();
};


var triangleCenters = [];

for(var i = 0; i<10; i++){
    triangleCenters.push(45+i*48);
}

for(var index = 0; index < 10; index++){
//for (var triangle in triangleCenters) {
  var triangleY = triangleCenters[index];
  fillTriangle(triangleY,175+index*4, 150-index*40);
   
      var hue = 150;
      var sat = 40;
      var light = 30;
      var trans = 1;
      canvas.fillStyle = "hsla(" + hue 
          +","+sat+"%,"+light+"%,"+trans*index*.05+")";

    
}

//var x = 40;
//var y = 80;