/*jshint laxbreak: true, browser: true*/

var canvas       = document.getElementById("canvas").getContext("2d");
var canvasHeight = 500;
var canvasWidth  = 500;


/***********************************************
 * Function generate  min > rand < max         *
 ***********************************************/
var rnd = function(min,max) {
  return Math.random() * (max - min) + min;
};


/***********************************************
 * Function draw a single Lines at x,y         *
 ***********************************************/
var drawLines = function (centerX, centerY, width, height, numLines) {
  var top    = centerY - height/2;
  var bottom = centerY + height/2;

  var left   = centerX - width/2;
  var right  = centerX + width/2;

  for (var lineCounter=0; lineCounter < numLines; lineCounter++) {
    var x1 = rnd(left,right);
    var x2 = rnd(left,right);
    var y1 = rnd(top, bottom);
    var y2 = rnd(top, bottom);
    canvas.beginPath();
    canvas.moveTo(x1,y1);
    canvas.lineTo(x2,y2);
    canvas.stroke();
  }
};


/***********************************************
 * Function  draw a grid of lines             *
 ***********************************************/
var drawGrid = function (rows, cols, spacing) {
  var horizontalSpacing  = canvasWidth  / cols;
  var verticalSpacing    = canvasHeight / rows;

  var width  = horizontalSpacing * spacing;
  var height = verticalSpacing   * spacing;

  var horizontalMargin = (canvasWidth  - (cols * horizontalSpacing))/2;
  var verticalMargin   = (canvasHeight - (rows * verticalSpacing))/2;

  var row = 0;
  var linesX = 0;
  var linesY = 0;
  var hue = Math.random() * 360;
  var colorWidth = Math.random() * 20;
  var light = 50;
  var randomness = 0;
  for (col = 0; col < cols; col++) {
    linesX = col * horizontalSpacing + horizontalSpacing/2 + horizontalMargin;
    hue = hue + col/cols * colorWidth;
    for (row = 0; row < rows; row++) {
      randomness = row / rows;
      light = row/rows * 90;
      linesY = row * verticalSpacing + verticalSpacing/2 + verticalMargin;
      drawLines(linesX, linesY, width, height, 10);
    }// row

  }// col
};


drawGrid(10,10,0.8);

