
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
    canvas.fill();
};

/***********************************************
 * Function  draw a grid of quads              *
 ***********************************************/
var drawGrid = function (rows, cols, spacing) {

    var width;
    var height;


    var col = 0;
    var row = 0;
    var quadX = 0;
    var quadY = 0;
    var hue = Math.random() * 360;
    var colorWidth = Math.random() * 20;
    var sat = 30;
    var light = 50;
    var randomness = 1;
    for (col = 0; col < cols; col++) {
        hue = hue + col/cols * colorWidth;
        for (row = 0; row < rows; row++) {
            quadX = Math.random()*500;
            light = row/rows * 90;
            quadY = Math.random()*500;
            setColor(hue, sat, light, 0.7);
            width=40;
            height=40;
            drawQuad(quadX, quadY, width, height, randomness);
        }// row

    }// col
};

/*********************************************************
 * Function that generates draws grids w/ random spacing *
 ********************************************************/
var draw = function() {
    var rows = 10;
    var cols = 10;
    var spacing = 0.2;
    drawGrid(rows, cols, spacing);
}

// draw it once
draw();


