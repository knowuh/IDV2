/**
 * Created by xingyueli on 1/31/16.
 */

////set margins
//var m = {t:50, r:50, b:50, l:100},
//    w = d3.select('.plot').node().clientWidth- m.l- m.r,
//    h = d3.select('.plot').node().clientHeight- m.t- m.b;
////set svg canvas
//
//var plot= d3.select('.plot').append('svg')
//.attr('width',w+ m.l+ m.r)
//.attr('height',h+ m.t+ m.b)
//.append('g').attr('class','canvas')
//.attr('transform','translate('+ m.l+','+ m.t+')');

//a.html: 10 n-gons (shapes of your own) (javascript & canvas)

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
    var cx=centerX,
        cy=centerY,
        c1x=cx-3,
        c1y=cy-3,
        c2x=cx+3,
        c2y=cy+3,
        d=diameter;

    // Filled triangle
    ctx.beginPath();
    ctx.moveTo(c1x-d/2,c1y-d/2);
    ctx.lineTo(c1x+d/2,c1y-d/2);
    ctx.lineTo(c1x-d/2,c1y+d/2);
    ctx.fill();

    // Stroked triangle
    ctx.beginPath();
    ctx.moveTo(c2x+d/2,c2y-d/2);
    ctx.lineTo(c2x+d/2,c2y+d/2);
    ctx.lineTo(c2x-d/2,c2y+d/2);
    ctx.closePath();
    ctx.stroke();
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
        cy=cdy*i+diameter*1.5;
        opacity=(1/rows)*(i+1);
        for(j=0;j<columns;j++){
            cx=cdx*j+diameter/2;
            setColor(hue, sat, light, opacity)
            SingleDraw(cx,cy,diameter)
        }
    }

}
//run
MultiDraw(2,5)
