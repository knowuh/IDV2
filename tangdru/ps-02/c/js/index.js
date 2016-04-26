var ctx = document.getElementById("canvas").getContext("2d");
   
var drawLine = function(){
 
var x1 = (Math.random()*800);
var y1 = (Math.random()*800);
var x2 = (Math.random()*800);
var y2 = (Math.random()*800);

   
ctx.beginPath();
ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
    
ctx.strokeStyle = "rgba(000, 250, 250, 0.5)";
ctx.stroke();
};


for (var i=0; i<250; i++){
    drawLine();
};


var drawLine2 = function(){
 
var x1 = (Math.random()*800);
var y1 = (Math.random()*800);
var x2 = (Math.random()*800);
var y2 = (Math.random()*800);

   
ctx.beginPath();
ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
    
ctx.strokeStyle = "rgba(200, 10, 200, 0.5)";
ctx.stroke();
};


for (var i=0; i<250; i++){
    drawLine2();
};

var drawLine3 = function(){
 
var x1 = (Math.random()*800);
var y1 = (Math.random()*800);
var x2 = (Math.random()*800);
var y2 = (Math.random()*800);

   
ctx.beginPath();
ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
    
ctx.strokeStyle = "rgba(0, 0, 200, 0.5)";
ctx.stroke();
};


for (var i=0; i<250; i++){
    drawLine3();
};

var drawLine4 = function(){
 
var x1 = (Math.random()*800);
var y1 = (Math.random()*800);
var x2 = (Math.random()*800);
var y2 = (Math.random()*800);

   
ctx.beginPath();
ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
    
ctx.strokeStyle = "rgba(0, 250, 100, 0.5)";
ctx.stroke();
};


for (var i=0; i<250; i++){
    drawLine4();
};
