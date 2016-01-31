var canvas = document.getElementById("canvas").getContext("2d");

//set canvas fill color to white
canvas.fillStyle = "hsla(53, 99%, 99%, 0.94)";
//draw a filled rectangle the size of the canvas
canvas.fillRect(0,0,500,500);

//draw a rectangle outline, using 4 input parameters
//add random components to prevent regularity
var rectOutline = function(topX, topY,length, height) {
  //set up variables    
  var topLeftX = topX+3*Math.random();
  var topLeftY = topY+2*Math.random();    
  var topRightX = topX+length+2*Math.random();
  var bottomY = topY + height+4*Math.random();
  var bottomLeftX = topX+4*Math.random();
  var bottomRightX = topX + length+2*Math.random();
  
  //actually draw rectangles (note that canvas.lineWidth will change color if set to a value lower than 1, but will not get thinner!)    
  canvas.beginPath();
  canvas.strokeStyle = "gray";
   // canvas.fillStyle="red";
  canvas.lineWidth=1;
  canvas.moveTo(topLeftX, topLeftY);
  canvas.lineTo(topRightX, topY);
  canvas.lineTo(bottomRightX, bottomY);
  canvas.lineTo(bottomLeftX, bottomY);
  canvas.closePath();
  canvas.stroke();
  //canvas.fill();
};

//create a group of rectangles centered around the same point
var rectGroup = function(centerX,centerY, size, numOfRects){
    var topXBounding = (centerX-size/2)+3*Math.random();
    var topYBounding = (centerY-size/2)+3*Math.random();
    var sizeIncr = size/(2*numOfRects);
    
    //draw the outer rectangle
    rectOutline(topXBounding,topYBounding,size,size);

    //add the number of inner rectangles requested by the calling function
    for (var i=0;i<numOfRects;i++){
          rectOutline(topXBounding+i*sizeIncr+Math.random(),
                      topYBounding+i*sizeIncr+Math.random(),
                      size-2*i*sizeIncr+2*Math.random(),
                      size-2*i*sizeIncr+2*Math.random());
    }
}

//make an 8x8 grid of rectangle groups, with a random number of rectangles
for (var j=0;j<8;j++){
    for (var k=0;k<8;k++){
        //use a and b to set a threshold min/max, from http://stackoverflow.com/questions/6028649/javascript-math-random-parameter
        var a = 3;
        var b = 5;
        rectGroup(35+60*j,38+60*k,50,7*Math.random()*(b-a)+a);
    }
}