var margin = {t:50,r:50,b:50,l:50};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
	height = document.getElementById('plot').clientHeight-margin.t-margin.b;



var canvas = document.getElementById('canvasCover').getContext("2d");
var canvasHeight = 700;
var canvasWidth  = 500;



var img = new Image();

img.onload = function() {
 canvas.drawImage(img,90,90);
};

img.src = 'cover/cover.jpg';


function changeImage()
{
    var bannerImages = new Array( );

    bannerImages[0] = "cover/cover.jpg";
    bannerImages[1] = "cover/cover2.jpg";
    bannerImages[2] = "cover/cover3.jpg";
    bannerImages[3] = "cover/cover4.jpg";

    var randomImageIndex = Math.floor( Math.random( ) * bannerImages.length );
    img.src = bannerImages[randomImageIndex];
}


window.setInterval(changeImage, 2000);


var drawLines = function (numLines) {

  var lineCounter=0;

  while (lineCounter < numLines) {
    canvas.beginPath();
    canvas.moveTo(Math.floor(Math.random()*20)+40,Math.floor(Math.random()*40)+25);
    canvas.lineTo(Math.floor(Math.random()*120)+300,Math.floor(Math.random()*40)+25);
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(Math.floor(Math.random()*20)+40,Math.floor(Math.random()*40)+420);
    canvas.lineTo(Math.floor(Math.random()*120)+300,Math.floor(Math.random()*40)+420);
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(Math.floor(Math.random()*20)+40,Math.floor(Math.random()*120)+25);
    canvas.lineTo(Math.floor(Math.random()*20)+40,Math.floor(Math.random()*120)+380);
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(Math.floor(Math.random()*20)+380,Math.floor(Math.random()*120)+380);
    canvas.lineTo(Math.floor(Math.random()*20)+380,Math.floor(Math.random()*120)+25);
    canvas.stroke();


    lineCounter = lineCounter +1;
  }
};



var draw = function() {
   //canvas.clearRect(0,0,canvasWidth,canvasHeight)
    drawLines(2);
}

// draw it once
draw();

// setup a timer to redraw
//var delay = 2000;
//setInterval(draw,delay);

var x = 0;
var intervalID = setInterval(function () {

   draw();

   if (++x === 4) {
       window.clearInterval(intervalID);
   }
}, 2000);

