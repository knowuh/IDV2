
var canvas       = document.getElementById("myCanvas");
var canvasHeight = 500;
var canvasWidth  = 200;
var ctx = canvas.getContext("2d");

var i;
ctx.stroke();
console.log("hellow");
var drawSinc=function(p){
    var counter = 0, x=0,y=p;
//100 iterations
    var increase = (90/180*Math.PI / 9)/3;
//for(j=0;j<4;j++){
    //increase=increase*(j+1);
    //x=0,y=180;
    for(i=0; i<=80; i+=1){
        ctx.moveTo(x,y);
        x = i;
        y = p - Math.sin(counter) * 30;
        counter += increase;
        ctx.lineTo(x,y);
        ctx.stroke();
        //alert( " x : " + x + " y : " + y + " increase : " + counter ) ;
    }
    increase=increase/2;
    for(i=81; i<=300; i+=1){
        ctx.moveTo(x,y);
        x = i;
        y =  p - Math.sin(counter) * 30;
        counter += increase;
        ctx.lineTo(x,y);
        ctx.stroke();
        //alert( " x : " + x + " y : " + y + " increase : " + counter ) ;
    }
    increase=increase/2;
    for(i=301; i<=500; i+=1){
        ctx.moveTo(x,y);
        x = i;
        y =  p - Math.sin(counter) * 30;
        counter += increase;
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.closePath();
        //alert( " x : " + x + " y : " + y + " increase : " + counter ) ;
    }

}

    //for(i=0;i<100;i++){
    //    p=50+i*10;
    //    drawSinc(p);
    //}
drawSinc(40);
drawSinc(50);
drawSinc(60);
drawSinc(70);
drawSinc(80);
drawSinc(90);
drawSinc(100);
drawSinc(110);
drawSinc(120);
drawSinc(130);
drawSinc(140);
//drawSinc(150);
//drawSinc(160);
//drawSinc(170);
//drawSinc(180);
//drawSinc(190);
//drawSinc(200);

//}
