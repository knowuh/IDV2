/**
 * Created by June on 16/2/1.
 */
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


var drawCircle = function (centerX,centerY,diameter) {
    var radius = diameter / 2;

    canvas.beginPath();
    canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    canvas.fillStyle = '#004033';
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
    var hue = 180;
    var sat = 30;
    var light = 50;

    for (col = 0; col < cols; col++) {
        triangleX = col * horizontalSpacing + radius;

        for (row = 0; row < rows; row++) {
            light = row/rows * 90;
            triangleY = row * verticalSpacing + radius;
            //setColor(hue, sat, light, 1);
            drawCircle(triangleX, triangleY, diameter);
        }// row

    }// col
};

// Here we just do our work:
drawGrid(7,7);

for(var i=0;i<4;i++){
    var x,y;
    switch(i){
        case 0:x=0;y=0;break;
        case 1:x=500;y=0;break;
        case 2:x=500;y=500;break;
        case 3:x=0;y=500;break;
    }
    canvas.beginPath();
    canvas.arc(x,y,250,0,2*Math.PI);
    canvas.fillStyle='rgba(0,229,184,0.6)';
    canvas.fill();
}