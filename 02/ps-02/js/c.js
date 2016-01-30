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
  canvas.strokeStyle = colorString;
  canvas.lineWidth = 0.5;
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
var drawQuad = function (centerX, centerY, width, height, wiggliness) {
  var top    = centerY - height/2;
  var bottom = centerY + height/2;

  var left   = centerX - width/2;
  var right  = centerX + width/2;

  var rjst = function() {
    return Math.random() * (width/2 * wiggliness);
  };

  canvas.beginPath();
  canvas.moveTo(left  - rjst(), top    - rjst());
  canvas.lineTo(right + rjst(), top    - rjst());
  canvas.lineTo(right + rjst(), bottom + rjst());
  canvas.lineTo(left  - rjst(), bottom + rjst());
  canvas.closePath();
  canvas.stroke();
};


/***********************************************
 * Function  draw a grid of quads              *
 ***********************************************/
var drawGrid = function (rows, cols, spacing) {
  var horizontalSpacing  = canvasWidth  / cols;
  var verticalSpacing    = canvasHeight / rows;

  var width  = horizontalSpacing * spacing;
  var height = verticalSpacing   * spacing;

  var horizontalMargin = (canvasWidth  - (cols * horizontalSpacing))/2;
  var verticalMargin   = (canvasHeight - (rows * verticalSpacing))/2;

  var col = 0;
  var row = 0;
  var quadX = 0;
  var quadY = 0;
  var hue = Math.random() * 360;
  var colorWidth = Math.random() * 20;
  var sat = 30;
  var light = 50;
  var randomness = 0;
  for (col = 0; col < cols; col++) {
    quadX = col * horizontalSpacing + horizontalSpacing/2 + horizontalMargin;
    hue = hue + col/cols * colorWidth;
    for (row = 0; row < rows; row++) {
      randomness = row / rows;
      light = row/rows * 90;
      quadY = row * verticalSpacing + verticalSpacing/2 + verticalMargin;
      setColor(hue, sat, light, 1);

      drawQuad(quadX, quadY, width, height, randomness);
    }// row

  }// col
};

/*********************************************************
 * Function that generates draws grids w/ random spacing *
 ********************************************************/
var draw = function() {
  clear();
  var rows = Math.round(Math.random() * 30 + 5);
  var cols = Math.round(Math.random() * 30 + 5);
  var spacing = Math.random();
  drawGrid(rows, cols, spacing);
}

// draw it once
draw();

// setup a timer to redraw
var delay = 1000;
setInterval(draw,delay);

