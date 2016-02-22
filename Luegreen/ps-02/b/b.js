/*jshint laxbreak: true, browser: true*/

var canvas       = document.getElementById("canvas").getContext("2d");
var canvasHeight = 500;
var canvasWidth  = 500;

/***********************************************
* Function to set the fill color of the canvas *
***********************************************/
var setColor = function (hue, sat, light, alpha) {
  var colorString = "hsla("
    + hue   + ", "
    + sat   + "%, "
    + light + "%, "
    + alpha + ")";
  canvas.fillStyle = colorString;
};


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
* Function  draw a grid of triangles           *
***********************************************/
var drawGrid = function (rows, cols) {
  var horizontalSpacing  = canvasWidth  / cols;
  var verticalSpacing    = canvasHeight / rows;
  var diameter = Math.min(verticalSpacing, horizontalSpacing) * 0.8;
  var radius   = diameter / 2;
  var col = 0;
  var row = 0;
  var triangleX = 0;
  var triangleY = 0;
  var hue = 20;
  var sat = 90;
  var light = 120;
  
  for (col = 0; col < cols; col++) {
    triangleX = col * horizontalSpacing + radius;

    for (row = 0; row < rows; row++) {
      light = row/rows * 90;
      triangleY = row * verticalSpacing + radius;
      setColor(hue, sat, light, 1);
      drawTriangle(triangleX, triangleY, diameter);  
    }// row
    
  }// col
};

// Here we just do our work:
drawGrid(10,10);

