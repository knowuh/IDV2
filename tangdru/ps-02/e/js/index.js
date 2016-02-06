var ctx = document.getElementById("canvas").getContext("2d");

ctx.fillStyle = "#b5ae87";
ctx.fillRect(0, 0, 800, 800);


//draw circle
var drawCirc = function(){
    ctx.beginPath();
    ctx.arc(490, 400, 380, 0, 2 * Math.PI);
    var grd = ctx.createLinearGradient(0, 0, 1000, 0);
    grd.addColorStop(0, "#95865c");
    grd.addColorStop(0.5, "#a996a0");
    grd.addColorStop(1, "#95865c");
    ctx.fillStyle = grd;
    ctx.fill();
}

//draw polygon 1
var drawPoly1 = function(){
    var poly=[ 300,180, 750,168, 750,620, 300,500 ];
    var grd = ctx.createLinearGradient(0, 0, 775, 0);
    grd.addColorStop(.25, "#e3efc3");
    grd.addColorStop(1, "#607c71");
    ctx.fillStyle = grd;

    ctx.beginPath();
    ctx.moveTo(poly[0], poly[1]);
    for( item=2 ; item < poly.length-1 ; item+=2 ){ctx.lineTo( poly[item] , poly[item+1] )}
    ctx.closePath();
    ctx.fill();
}

//draw polygon 2
var drawPoly2 = function(){
    var poly=[ 433,328, 523,333, 534,360, 407,353 ];
    ctx.fillStyle = '#828c73';

    ctx.beginPath();
    ctx.moveTo(poly[0], poly[1]);
    for( item=2 ; item < poly.length-1 ; item+=2 ){ctx.lineTo( poly[item] , poly[item+1] )}
    ctx.closePath();
    ctx.fill();
}

//draw polygon 3
var drawPoly3 = function(){
    var poly=[ 407,353, 534,360, 534,500, 407,490 ];
    ctx.fillStyle = '#7ea291';

    ctx.beginPath();
    ctx.moveTo(poly[0], poly[1]);
    for( item=2 ; item < poly.length-1 ; item+=2 ){ctx.lineTo( poly[item] , poly[item+1] )}
    ctx.closePath();
    ctx.fill();
}

var drawPoly4 = function(){
    var poly=[ 180,407, 320,390, 445,420, 260,450 ];
    var grd = ctx.createLinearGradient(0, 0, 300, 0);
    grd.addColorStop(0, "#9d608e");
    grd.addColorStop(1, "#595437");
    ctx.fillStyle = grd;

    ctx.beginPath();
    ctx.moveTo(poly[0], poly[1]);
    for( item=2 ; item < poly.length-1 ; item+=2 ){ctx.lineTo( poly[item] , poly[item+1] )}
    ctx.closePath();
    ctx.fill();
}

var drawPoly5 = function(){
    var poly=[ 180,407, 260,450, 260,675, 180,580 ];
    ctx.fillStyle = '#7b613a';

    ctx.beginPath();
    ctx.moveTo(poly[0], poly[1]);
    for( item=2 ; item < poly.length-1 ; item+=2 ){ctx.lineTo( poly[item] , poly[item+1] )}
    ctx.closePath();
    ctx.fill();
}

var drawPoly6 = function(){
    var poly=[ 260,450, 445,420, 445,613, 260,675 ];
    ctx.fillStyle = '#956847';

    ctx.beginPath();
    ctx.moveTo(poly[0], poly[1]);
    for( item=2 ; item < poly.length-1 ; item+=2 ){ctx.lineTo( poly[item] , poly[item+1] )}
    ctx.closePath();
    ctx.fill();
}

drawCirc();
drawPoly1();
drawPoly2();
drawPoly3();
drawPoly4();
drawPoly5();
drawPoly6();




