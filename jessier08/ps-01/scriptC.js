var canvasWidth = document.getElementById('canvas').clientWidth,
    canvasHeight = document.getElementById('canvas').clientHeight;

var margin = {t:20,r:20,b:20,l:20};
var plotWidth = canvasWidth - margin.l - margin.r,
    plotHeight = canvasHeight - margin.t - margin.b;

var plot = d3.select('#canvas')
	.append('svg')
	.attr('width', canvasWidth)
	.attr('height', canvasHeight)
	.append('g');

plot
	.append('circle')
	.attr('cx',100)
	.attr('cy',650)
	.attr('r',200)
    .style('fill','#545454');

plot
	.append('circle')
	.attr('cx',500)
	.attr('cy',300)
	.attr('r',150)
    .style('fill','#545454');

plot
	.append('circle')
	.attr('cx',550)
	.attr('cy',700)
	.attr('r',100)
    .style('fill','#545454');