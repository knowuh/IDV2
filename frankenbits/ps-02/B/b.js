var canvas = document.getElementById("canvas").getContext("2d");
//find the canvas element and drawing object
var canvasHeight = 500;
var canvasWidth = 500;


var drawSquare = function(){
    var x = (Math.random()*500);
    var y = (Math.random()*500);
    var w = (Math.random()*(75-25) + 25);
    var h = w;
    //random width between 75-25px including 25px
    var alpha = Math.random();
    //random transparency
    
        if (alpha < .1){
            alpha += .1
            //makes sure they are not invisible
        };
    
    canvas.fillStyle = "hsla(162, 100%, 35%, "+alpha+")";
    //make them that color but vary the transparency
    canvas.fillRect(x,y,w,h);
  
};

for (var i=0; i<100; i++){
    
    drawSquare();
    //draw 100 squares wherever you want inside the canvas parameters
};
