var canvas = document.getElementById("canvas").getContext("2d");

    
var randomSquare = function(){
    
    var x = (Math.random()*500);
    var y = (Math.random()*500);
    var wh = (Math.random()*100);
    var op = Math.random();

        if (op < .1){
            op += .1
        };

    canvas.fillStyle = "rgba(130,60,120,"+op+")";
    canvas.fillRect(x,y,wh,wh);

};

for (var i=0; i<100; i++){
   
    randomSquare();
};
    

