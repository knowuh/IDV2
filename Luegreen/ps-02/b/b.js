/*jshint laxbreak: true, browser: true*/

var canvas       = document.getElementById("canvas").getContext("2d");
var canvasHeight = 500;
var canvasWidth  = 500;

/***********************************************
* Function to set the fill color of the triangles *
***********************************************/
var setColor = function (hue, sat, light, alpha) {
  var colorString = "hsla("
    + hue   + ", "
    + sat   + "%, "
    + light + "%, "
    + alpha + ")";
  canvas.fillStyle = colorString;
};


////to make the canvas resize with the window
///* important! for alignment, you should make things
// * relative to the canvas' current width/height.
// */
//function draw() {
//  var ctx = (a canvas context);
//  ctx.canvas.width  = window.innerWidth;
//  ctx.canvas.height = window.innerHeight;
//  //...drawing code...
//}


/***********************************************
* Function draw a single Triangle at x,y       *
***********************************************/
var drawTriangle = function (centerX, centerY, diameter) {
  var radius = diameter;
  
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
  var radius   = diameter / 10;
  var col = 0;
  var row = 0;
  var triangleX = 0;
  var triangleY = 0;
  var hue = 10;
  var sat = 50;
  var light = 120;
  
  for (col = 0; col < cols; col++) {
    triangleX = col * horizontalSpacing + radius;

    for (row = 0; row < rows; row++) {
      light = row/rows * 30;
      triangleY = row * verticalSpacing + radius;
      setColor(hue, sat, light, 1);
      drawTriangle(triangleX, triangleY, diameter);  
    }// row
    
  }// col
};

// Here we just do our work:
drawGrid(7.5,7.1);


