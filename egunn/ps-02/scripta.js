var canvas = document.getElementById("canvas").getContext("2d");

//from sample code
var setColor = function (hue, sat, light, alpha) {
  var colorString = "hsla("
    + hue   + ", "
    + sat   + "%, "
    + light + "%, "
    + alpha + ")";
  canvas.fillStyle = colorString;
};

var fillTriangle = function(xCenter, yCenter,diameter) {
  //var diameter = 24;
  var radius = diameter/2;
  var topOfTriangle = yCenter + radius;
  var bottomOfTriangle = topOfTriangle - radius;
  var left = xCenter - radius;
  var right = xCenter + radius;
  canvas.moveTo(xCenter, topOfTriangle);
  canvas.lineTo(right, bottomOfTriangle);
  canvas.lineTo(left, bottomOfTriangle);
  canvas.fill();
};


var triangleCenters = [];

for(var i = 0; i<10; i++){
    triangleCenters.push(45+i*48);
}

for(var index = 0; index < 10; index++){
//for (var triangle in triangleCenters) {
  var triangleY = triangleCenters[index];
  fillTriangle(50+triangleY*.54+index*10,275-index*15, 150-index*40);
   
      var hue = 150;
      var sat = 40;
      var light = 30;
      var trans = 1;
      canvas.fillStyle = "hsla(" + hue 
          +","+sat+"%,"+light+"%,"+trans*index*.05+")";

    
}

//var x = 40;
//var y = 80;