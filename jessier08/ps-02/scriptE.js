var canvas = document.getElementById("canvas").getContext("2d");

var x = 15;
var y = 15;
var r = 10;
var op = 1;

var circle = function(){
    canvas.beginPath();
    canvas.arc(x,y,r,0,2*Math.PI);
    canvas.globalAlpha = op;
    canvas.strokeStyle = "rgb(130,60,120)";
    canvas.stroke();
}
   
for (var i=0; i<25; i++){
    
    for(var j=0; j<25; j++){
        
        x = x + ((Math.random()*4)+20); //move squares 22 px each time in a row
        
        circle();
    }

    op = op - (Math.random()*.08);
    if (op<.05){op=.1};
    
    r = r - ((Math.random()*5)-3); //make circles r decrease .375 each row 
   
    y = y + ((Math.random()*8)+20); //move circles down by 22 in each row start
   
    x = 15;//start each row at x=15  
};

