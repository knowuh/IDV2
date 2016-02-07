var canvas = document.getElementById("canvas").getContext("2d");
var width = document.getElementById('canvas').clientWidth,
    height = document.getElementById('canvas').clientHeight
//var height = window.innerHeight;
//var width = window.innerWidth;


//var fillTriangle = function(xCenterOfTriangle, yCenterOfTriangle, diameter) {
//    var radius = diameter/2;
//    var topOfTriangle = yCenterOfTriangle - (radius);
//    var bottomOfTriangle = topOfTriangle  +  (radius);
//    var left = xCenterOfTriangle - (radius);
//    var right = xCenterOfTriangle + (radius);
//    canvas.moveTo(xCenterOfTriangle,topOfTriangle);
//    canvas.lineTo(right, bottomOfTriangle);
//    canvas.lineTo(left, bottomOfTriangle);
//    canvas.fill();
//};

//
//var triangles = [50, 100, 150];
//
//for (var index = 0; index < 3;  index++) {
//    var triangleY = triangles[index];
//    fillTriangle(100, triangleY, 30);
//    console.log(index);
//    console.log(triangleY);
//}

var drawTriangle = function(x,y,x1,y1,x2,y2){
    canvas.beginPath()
    canvas.moveTo(x,y);
    canvas.lineTo(x1,y1);
    canvas.lineTo(x2,y2);
    canvas.fill()
    //canvas.stroke();
    //canvas.closePath();
}

var newArray=[]
var xRandom,yRandom,x1Random,y1Random,x2Random,y2Random
for(i=0;i<10;i++){

    xRandom=Math.random()*width;
    yRandom=Math.random()*height;
    x1Random=Math.random()*width;
    x2Random=Math.random()*height;
    y1Random=Math.random()*width;
    y2Random=Math.random()*height;

    var newObject={x:xRandom,y:yRandom,x1:x1Random,y1:y1Random,x2:x2Random,y2:y2Random}
    newArray.push(newObject);

    drawTriangle(newObject.x,newObject.y,newObject.x1,newObject.y1,newObject.x2,newObject.y2);
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    canvas.fillStyle=getRandomColor();
    canvas.globalAlpha=0.5;
}



