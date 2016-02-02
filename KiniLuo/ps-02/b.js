//var canvas = document.getElementById("canvas").getContext("2d");


var canvas = document.getElementById("canvas").getContext("2d");
var heading = document.getElementById("heading");
height = window.innerHeight-heading.clientHeight;
width = window.innerWidth;


var drawSquare=function(x,y,w,h){
    canvas.fillRect(x,y,w,h);
}

var newArray=[]
var xRandom,yRandom,wRandom,hRandom;
//var colorRandom;

var numberOfSquares=100
for (var i= 0;i<numberOfSquares;i++){

    xRandom=Math.random()*width,
    yRandom=Math.random()*height,
    wRandom=Math.random()*120,
    hRandom=Math.random()*120;

    var newObject={
        x:xRandom,y:yRandom,w:wRandom,h:hRandom
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

//console.log(newArray);
//






