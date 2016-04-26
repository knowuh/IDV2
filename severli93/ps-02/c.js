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
    ctx.strokeStyle = colorString;
};

//single draw
var SingleDraw = function(centerX,centerY,diameter){
    var ox=centerX,
        oy=centerY,
        fx=diameter*(Math.random()),
        fy=diameter*(Math.random());

    //stroke
    ctx.beginPath();
    ctx.moveTo(ox,oy);
    ctx.lineTo(ox+fx,oy+fy);
    ctx.closePath();
    ctx.stroke();
}
//multi draw
var MultiDraw= function(rows,columns,repeat,d){
    var horizontalSpacing  = canvasWidth  / columns;
    var verticalSpacing    = canvasHeight / rows;
    var diameter = Math.min(horizontalSpacing, verticalSpacing) * 0.8;
    //color

    var hue = 60;
    var sat = 60;
    var light = 90;

    //var n=rows+column;
    var cdx=canvasWidth/columns,
        cdy=canvasHeight/rows;

    for (i=0;i<rows;i++){
        cy=cdy*i;
        for(j=0;j<columns;j++){
            cx=cdx*j;
            for(k=0;k<repeat;k++){
                opacity=(1/repeat)*(k+1);
                hue = (360/columns)*(j+1);
                light = 100-(100/rows)*(i+1)*.7;
                setColor(hue, sat, light, opacity);
                console.log(cx,cy,diameter)
                SingleDraw(cx,cy,diameter);
            }
        }
    }
}

//run
MultiDraw(10,10,10)

