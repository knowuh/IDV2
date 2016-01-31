var canvas = document.getElementById("canvas").getContext("2d");

    
var randomLine = function(){
    
    var xM = (Math.random()*550);
    var yM = (Math.random()*550);
    var xL = (Math.random()*550);
    var yL = (Math.random()*550);
    
    var op = ((Math.random()*.7));

    
    canvas.beginPath();
    canvas.moveTo(xM,yM);
    canvas.lineTo(xL,yL);
    canvas.strokeStyle = "rgba(130,60,120,"+op+")";
    canvas.stroke();

};


for (var i=0; i<1000; i++){
   
    randomLine();
};
    

