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
  canvas.strokeStyle = "hsla(1,0%,40%,0.0)";
  canvas.lineWidth = 0.2
};


/***********************************************
 * Function clear the screen                   *
 ***********************************************/
var clear = function () {
  setColor(1,0,100,1);
  canvas.fillRect(0,0,canvasWidth,canvasHeight);
}


/***********************************************
 * Function draw a single Quad at x,y       *
 ***********************************************/
var drawQuad = function (centerX, centerY, diameter, wiggliness) {
  var radius = diameter / 2;
  var top    = centerY - radius;
  var bottom = centerY + radius;

  var left   = centerX - radius;
  var right  = centerX + radius;

  var rjst = function() {
    return Math.random() * (radius * wiggliness);
  };

  canvas.beginPath();
  canvas.moveTo(left  - rjst(), top    - rjst());
  canvas.lineTo(right + rjst(), top    - rjst());
  canvas.lineTo(right + rjst(), bottom + rjst());
  canvas.lineTo(left  - rjst(), bottom + rjst());
  canvas.fill();
  canvas.stroke();
};


/***********************************************
 * Function  draw a grid of quads              *
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
  var hue = Math.random() * 360;
  var colorWidth = Math.random() * 20;
  var sat = 30;
  var light = 50;
  var randomness = 0;
  for (col = 0; col <= cols; col++) {
    triangleX = col * horizontalSpacing + radius;
    hue = hue + col/cols * colorWidth;
    for (row = 0; row <= rows; row++) {
      randomness = row / rows;
      light = row/rows * 90;
      triangleY = row * verticalSpacing + radius;
      setColor(hue, sat, light, 1);

      drawQuad(triangleX, triangleY, diameter, randomness);
    }// row

  }// col
};

// Here we just do our work:
var draw = function() {
  clear();
  rows = Math.random() * 40 + 5;
  drawGrid(rows, rows);
}
draw();
setInterval(draw,5000);
