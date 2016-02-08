
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
 * Function draw a centered line of triangles   *
 ***********************************************/
var centeredTriangles = function (numberOfTriangles) {
    var x        = canvasWidth*Math.random();
    var spacing  = canvasHeight / numberOfTriangles;
    var diameter = spacing * 0.8;
    var radius   = diameter / 2;
    var triangleCounter = 0;
    var hue = 180;
    var sat = 30;
    var light = 50;

    while (triangleCounter < numberOfTriangles) {
        x     = canvasWidth*Math.random();
        light = triangleCounter/numberOfTriangles*90;
        setColor(hue,sat,light,1);
        drawTriangle(x, spacing * triangleCounter + radius, diameter);
        triangleCounter = triangleCounter + 1;
    }
};

// GO!
centeredTriangles(10);
