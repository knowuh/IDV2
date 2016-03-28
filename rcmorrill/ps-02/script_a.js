var margin = {t:50,r:50,b:50,l:50};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
	height = document.getElementById('plot').clientHeight-margin.t-margin.b;



var canvas = document.getElementById('canvas2').getContext("2d");
var canvasHeight = 500;
var canvasWidth  = 500;


var draw = function (numberOfShapes){


	var counter =0;

	while(counter < numberOfShapes){
		var startX = Math.floor(Math.random()*450+10);
		var startY = Math.floor(Math.random()*450+10);
		var nextX = (startX + Math.floor(Math.random()*300+50))
		var nextY = (startY + Math.floor(Math.random()*300+50))
		var nextX2 = (startX - Math.floor(Math.random()*300+100))
		var nextY2 = (startY + Math.floor(Math.random()*300+50))
		canvas.beginPath();
		canvas.moveTo(startX,startY);
		canvas.lineTo(nextX,nextY);
		canvas.lineTo(nextX2,nextY2);
		canvas.lineTo(startX,startY);
		canvas.fillStyle = 'rgba(123,123,123,.5)'
		canvas.fill();

		counter = counter +1;
	}

};

draw (10);
