var margin = {t:50,r:50,b:50,l:50};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
	height = document.getElementById('plot').clientHeight-margin.t-margin.b;



var canvas = document.getElementById('canvas2').getContext("2d");
var canvasHeight = 375;
var canvasWidth  = 375;


var draw = function(start,columns){

	var rowCounter=0;
	var columnCounter=0;


	while(columnCounter < columns){
		var startX = columnCounter * canvasWidth/(columns+(columns*.30)) + 10;
		var nextX = startX +Math.floor(Math.random()*75+10);
		var nextX2 = nextX +Math.floor(Math.random()*60)-30;
		var nextX3 = nextX2 - Math.floor(Math.random()*30+5);
		var startY = start;
		var nextY = startY+Math.floor(Math.random()*60)-30;
		var nextY2 = nextY +Math.floor(Math.random()*90+10);
		var nextY3 = nextY2+Math.floor(Math.random()*30)-15;

		canvas.beginPath();
		canvas.moveTo(startX,startY);
		canvas.lineTo(nextX,nextY);
		canvas.lineTo(nextX2,nextY2);
		canvas.lineTo(nextX3,nextY3);
		canvas.lineTo(startX,startY);
		canvas.strokeStyle = 'rgb(123,123,123)'
		canvas.stroke();

		columnCounter = columnCounter +1;

		

	}
}

draw (25,12);
draw (90,25);
draw (90,15);
draw (90,30);
draw (155,30);
draw (220,21);
draw (285,13);
