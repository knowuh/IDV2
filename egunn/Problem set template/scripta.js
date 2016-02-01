
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

canvas.fillStyle = "#000000";

var triangleCenters = [];

for(var i = 0; i<10; i++){
    triangleCenters.push(25+i*50);
}

for(var index = 0; index < 10; index++){
//for (var triangle in triangleCenters) {
  var triangleY = triangleCenters[index];
  fillTriangle(triangleY, triangleY, 40);
}

//var x = 40;
//var y = 80;