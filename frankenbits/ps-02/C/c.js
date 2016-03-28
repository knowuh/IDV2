var canvas = document.getElementById("canvas").getContext("2d");
//find the canvas element and drawing object

var canvasHeight = 500;
var canvasWidth = 500;


var drawLine = function(){
    var x1 = (Math.random()*500);
    var y1 = (Math.random()*500);
    var x2 = (Math.random()*500);
    var y2 = (Math.random()*500);
    
    
    canvas.beginPath();
    canvas.strokeStyle = getRandomColor();
    canvas.moveTo(x1,y1);
    canvas.lineTo(x2,y2);
    canvas.stroke();
  
};

 function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
}

for (var i=0; i<1000; i++){
    
    drawLine();
};
