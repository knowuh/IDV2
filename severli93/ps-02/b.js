/**
 * Created by xingyueli on 1/31/16.
 */

var canvas       = document.getElementById("canvas");
var canvasHeight = 500;
var canvasWidth  = 500;
var ctx = canvas.getContext("2d");

//color
var setColor = function (hue, sat, light, alpha) {
    var colorString = "hsla("
        + hue   + ", "
        + sat   + "%, "
        + light + "%, "
        + alpha + ")";
    ctx.fillStyle = colorString;
};
//single draw
var SingleDraw = function(centerX,centerY,diameter){
    var ox=centerX,
        oy=centerY,
        w=diameter,
        h=diameter;
   //stroke
    ctx.beginPath();
    ctx.fillRect(ox,oy,w,h);

}
//multi draw
var MultiDraw= function(rows,columns){
    //diameter
    var horizontalSpacing  = canvasWidth  / columns;
    var verticalSpacing    = canvasHeight / rows;
    var diameter = Math.min(verticalSpacing, horizontalSpacing) * 0.8;
    //color

    var hue = 180;
    var sat = 30;
    var light = 50;

    //var n=rows+column;
    var cdx=canvasWidth/columns,
        cdy=canvasHeight/rows;

    for (i=0;i<rows;i++){
        cy=cdy*i+diameter/100;
        opacity=(1/rows)*(i+1);
        for(j=0;j<columns;j++){
            cx=cdx*j+diameter/100;
            setColor(hue, sat, light, opacity)
            SingleDraw(cx,cy,diameter)
        }
    }

}
//run
MultiDraw(10,10)
