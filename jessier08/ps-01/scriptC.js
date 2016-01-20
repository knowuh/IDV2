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
	.attr('cx',500)
	.attr('cy',650)
	.attr('r',320)
    .style('stroke','#545454')
    .style('stroke-width','2px')
    .style('fill','none');

plot
	.append('circle')
	.attr('cx',500)
	.attr('cy',650)
	.attr('r',200)
    .style('stroke','#545454')
    .style('stroke-width','2px')
    .style('fill','none');

plot
	.append('circle')
	.attr('cx',500)
	.attr('cy',650)
	.attr('r',80)
    .style('stroke','#545454')
    .style('stroke-width','2px')
    .style('fill','none');