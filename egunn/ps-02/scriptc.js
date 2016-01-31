
var canvas = document.getElementById("canvas").getContext("2d");


var circlePoints = function(centerX,centerY,radiusInner,angleInner, radiusOuter, angleOuter) {
    var xInner = radiusInner*Math.cos(angleInner);
    var yInner = radiusInner*Math.sin(angleInner);
    var xOuter = radiusOuter*Math.cos(angleOuter);
    var yOuter = radiusOuter*Math.sin(angleOuter);
    
    //from http://www.w3schools.com/tags/canvas_strokestyle.asp
    var gradient=canvas.createRadialGradient(centerX,centerY,radiusInner,centerX,centerY, radiusOuter);
    gradient.addColorStop("0","purple");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","teal");

    // Fill with gradient
    canvas.strokeStyle=gradient;

    
   // canvas.strokeStyle="#FF0000";
    canvas.lineWidth=0.25;
    canvas.beginPath();
    canvas.moveTo(xInner+centerX, yInner+centerY);
    canvas.lineTo(xOuter+centerX, yOuter+centerY);
    canvas.stroke();
    
}

for (i=0;i<1000;i++){
    circlePoints(250,250,50,2*Math.PI*(i+200)/1000,200, 2*Math.PI*i/40);
}