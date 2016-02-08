var margin = {t:50,r:50,b:50,l:50};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
	height = document.getElementById('plot').clientHeight-margin.t-margin.b;



var canvas = document.getElementById('canvas2').getContext("2d");
var canvasHeight = 500;
var canvasWidth  = 500;






var draw = function(rows,columns){

	var rowCounter=0;
	var columnCounter=0;


	for(columnCounter=0; columnCounter < columns; columnCounter++){
		var startX = columnCounter * canvasWidth/columns + 10;
		var nextX = startX +Math.floor(Math.random()*20+10);
		var nextX2 = startX +Math.floor(Math.random()*20+10);
		var nextX3 = startX;

		for(rowCounter=0; rowCounter < rows; rowCounter++){
			var startY = rowCounter * canvasHeight/rows +10 ;
			var nextY = startY;
			var nextY2 = nextY +Math.floor(Math.random()*20+10);
			var nextY3 = nextY2;
		canvas.beginPath();
		canvas.moveTo(startX,startY);
		canvas.lineTo(nextX,nextY);
		canvas.lineTo(nextX2,nextY2);
		canvas.lineTo(nextX3,nextY3);
		canvas.lineTo(startX,startY);
		canvas.fillStyle = 'rgba(123,123,123,.5)'
		canvas.fill();

		}

	}
}

draw (10,10);




/*var draw = function (numberOfShapes){


	var counter =0;

	while(counter < numberOfShapes){

		var 
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

draw (10);*/
