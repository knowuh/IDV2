/**
 * Created by KiniLuo on 3/28/16.
 */
var canvas = document.getElementById("canvas").getContext("2d");
height = window.innerHeight+200;
width = window.innerWidth;


var drawSquare=function(x,y,w,h){
    canvas.fillRect(x,y,w,h);
}

var newArray=[]
var xRandom,yRandom,w,h;
//var colorRandom;

var numberOfSquares=200
for (var i= 0;i<numberOfSquares;i++){



        xRandom=Math.random()*width,
        yRandom=Math.random()*height,
        w=70,
        h=70;

    var newObject={
        x:xRandom,y:yRandom,w:w,h:h
    }
    newArray.push(newObject);
    drawSquare(newObject.x,newObject.y,newObject.w,newObject.h);


    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    canvas.fillStyle=getRandomColor();
}