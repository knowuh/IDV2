var canvas = document.getElementById("canvas").getContext("2d");

/*//from sample code
var setColor = function (hue, sat, light, alpha) {
  var colorString = "hsla("
    + hue   + ", "
    + sat   + "%, "
    + light + "%, "
    + alpha + ")";
  canvas.fillStyle = colorString;
};*/

var fillQuad = function(topX, topY,length, height, slope) {
  var topRightX = topX+length;
  var bottomY = topY + height;
  var angle = 180-slope;
  var bottomLeftX = topX-height*Math.tan(angle);
  var bottomRightX = bottomLeftX + length;
  
  canvas.beginPath();
  canvas.moveTo(topX, topY);
  canvas.lineTo(topRightX, topY);
  canvas.lineTo(bottomRightX, bottomY);
  canvas.lineTo(bottomLeftX, bottomY);
  canvas.fill();
};


/*var quadOrigins = [];

for(var i = 0; i<10; i++){
    quadOrigins.push(20+i*25);
}*/

for(var row = 0; row < 10; row++){
    for(var col = 0; col <10; col++){
   
        var hue = 10*row;
        var sat = 70;
        var light = col*8;
        var trans = 1;
        canvas.fillStyle = "hsla(" + hue 
          +","+sat+"%,"+light+"%,"+trans+")";
                     
        fillQuad(40+45*col,35+row*45,22+5*Math.random(),22+10*Math.random(),60+.5*Math.random());

    }
}