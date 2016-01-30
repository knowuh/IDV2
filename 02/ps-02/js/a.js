/*jshint laxbreak: true, browser: true*/

var canvas       = document.getElementById("canvas").getContext("2d");
var canvasHeight = 500;
var canvasWidth  = 500;


/***********************************************
* Function draw a single Triangle at x,y       *
***********************************************/
var drawTriangle = function (centerX, centerY, diameter) {
  var radius = diameter / 2;
  
  var top    = centerY - radius;
  var bottom = centerY + radius;
  
  var left   = centerX - radius;
  var right  = centerX + radius;
  
  canvas.beginPath();
  canvas.moveTo(centerX, top);
  canvas.lineTo(right,  bottom);
  canvas.lineTo(left,   bottom);
  canvas.fill();
};

/***********************************************
* Function draw a centered line of triangles   *
***********************************************/
var centeredTriangles = function (numberOfTriangles) {
  var x        = canvasWidth / 2;
  var spacing  = canvasHeight / numberOfTriangles;
  var diameter = spacing * 0.8;
  var radius   = diameter / 2;
  var triangleCounter = 0;
  
  while (triangleCounter < numberOfTriangles) {
    drawTriangle(x, spacing * triangleCounter + radius, diameter);
    triangleCounter = triangleCounter + 1;
  }
};

// GO!
centeredTriangles(10);
