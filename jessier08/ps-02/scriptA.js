var canvas = document.getElementById("canvas").getContext("2d");

//drawing 

//blueprint
var triangle = function(centerX, centerY, dW, dH) {
    var top = centerY - dH;
    var bottom = centerY + dH;
    var left = centerX - dW;
    var right = centerX + dW;
    canvas.moveTo(centerX,top);
    canvas.lineTo(right, bottom);
    canvas.lineTo(left, bottom);
    canvas.fill();
    canvas.globalAlpha = .2;
    canvas.fillStyle = "rgb(130,60,120)";
    canvas.rotate(Math.PI/4);
};


canvas.translate(300,300);


for (var i=0; i<10; i++){
    
    var nudgeX = (Math.random()*100)-100;
    var nudgeY = (Math.random()*100)-100;
    var varyW = (Math.random()*100)+100;
    var varyH = (Math.random()*100)+100;

    var x = nudgeX, 
        y = nudgeY,
        w = varyW, 
        h = varyH;
    
    console.log("("+x+","+y+","+w+","+h+")");
    
    triangle(x,y,w,h);
    
    console.log(canvas.globalAlpha);

};

setInterval(function() { window.location.reload();}, 1000); 
