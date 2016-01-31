var canvas = document.getElementById("canvas").getContext("2d");

var x = 50;
var y = 30;
var r = 10;
    
var circle = function(){
    
    var op = Math.random();
        if (op < .05){op += .1};
    
    canvas.beginPath();
    canvas.arc(x,y,r,0,2*Math.PI);
    canvas.strokeStyle = "rgba(130,60,120,"+op+")";
    canvas.stroke();
}
   
for (var i=0; i<25; i++){
    for(var j=0; j<25; j++){
        
//        r = r - .375;
//        if (r<0){r=10;};
        
        x = x + 22;
        
        circle();
    }
    
    
    r = r - .375;
    if (r<1){r=10;};
    
    y = y + 22;
    
    x = 50;
};

