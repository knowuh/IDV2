/**
 * Created by KiniLuo on 2/1/16.
 */
var canvas = document.getElementById("canvas").getContext("2d");
var heading = document.getElementById("heading");
height = window.innerHeight-heading.clientHeight;
width = window.innerWidth;


var drawCurve1=function(x,y){
    var x1=x+10,
        y1=y-50,
        x2=x+30,
        y2=y-50,
        x3=x+40,
        y3=y;

    canvas.moveTo(x,y);
    canvas.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    canvas.stroke();
    canvas.lineWidth=.1;

}
for(var i= 0;i<99;i++){

    var yPos=50+5*i;
    drawCurve1(50,yPos);

}

drawCurve2=function(x,y){
    var x1=x+20,
        y1=y+50,
        x2=x+60,
        y2=y+50,
        x3=x+80,
        y3=y;
    canvas.moveTo(x,y);
    canvas.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    canvas.stroke();
    canvas.lineWidth=.1;
}
for(var i= 0;i<99;i++){

    var yPos=50+5*i;
    drawCurve2(90,yPos);

}

drawCurve3=function(x,y){
    var x1=x+30,
        y1=y-50,
        x2=x+90,
        y2=y-50,
        x3=x+120,
        y3=y;
    canvas.moveTo(x,y);
    canvas.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    canvas.stroke();
    canvas.lineWidth=.1;
}
for(var i= 0;i<99;i++){

    var yPos=50+5*i;
    drawCurve3(170,yPos);
}

drawCurve4=function(x,y){
    var x1=x+40,
        y1=y+50,
        x2=x+120,
        y2=y+50,
        x3=x+160,
        y3=y;
    canvas.moveTo(x,y);
    canvas.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    canvas.stroke();
    canvas.lineWidth=.1;
}
for(var i= 0;i<99;i++){

    var yPos=50+5*i;
    drawCurve4(290,yPos);
}

drawCurve5=function(x,y){
    var x1=x+50,
        y1=y-50,
        x2=x+150,
        y2=y-50,
        x3=x+200,
        y3=y;
    canvas.moveTo(x,y);
    canvas.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    canvas.stroke();
    canvas.lineWidth=.1;
}
for(var i= 0;i<99;i++){
    var yPos=50+5*i;
    drawCurve5(450,yPos);
}

drawCurve6=function(x,y){
    var x1=x+60,
        y1=y+50,
        x2=x+180,
        y2=y+50,
        x3=x+240,
        y3=y;
    canvas.moveTo(x,y);
    canvas.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    canvas.stroke();
    canvas.lineWidth=.1;
}
for(var i= 0;i<99;i++){

    var yPos=50+5*i;
    drawCurve6(650,yPos);
}

drawCurve7=function(x,y){
    var x1=x+70,
        y1=y-50,
        x2=x+210,
        y2=y-50,
        x3=x+280,
        y3=y;
    canvas.moveTo(x,y);
    canvas.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    canvas.stroke();
    canvas.lineWidth=.1;
}
for(var i= 0;i<99;i++){

    var yPos=50+5*i;
    drawCurve7(890,yPos);
}

drawCurve8=function(x,y){
    var x1=x+80,
        y1=y+50,
        x2=x+240,
        y2=y+50,
        x3=x+320,
        y3=y;
    canvas.moveTo(x,y);
    canvas.bezierCurveTo(x1,y1,x2,y2,x3,y3);
    canvas.stroke();
    canvas.lineWidth=.1;
}
for(var i= 0;i<99;i++){

    var yPos=50+5*i;
    drawCurve8(1170,yPos);
    canvas.strokeStyle='blue';
}

