var margin = {t:50,r:50,b:50,l:50};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
	height = document.getElementById('plot').clientHeight-margin.t-margin.b;



var canvas = document.getElementById('canvas2').getContext("2d");
var canvasHeight = 500;
var canvasWidth  = 500;


var drawLines = function (numLines) {

	var x1 = Math.floor(Math.random()*450+10);
	var y1 = Math.floor(Math.random()*450+10);


  var lineCounter=0;

  while (lineCounter < numLines) {
    canvas.beginPath();
    canvas.moveTo(x1,y1);
    canvas.lineTo(Math.floor(Math.random()*450+10),Math.floor(Math.random()*450+10));
    canvas.stroke();


    lineCounter = lineCounter +1;
  }
};

drawLines(1000);
