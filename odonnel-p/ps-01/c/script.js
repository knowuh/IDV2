var canvasWidth = document.getElementById('canvas').clientWidth,
    canvasHeight = document.getElementById('canvas').clientHeight;

var margin = {t:20,r:20,b:20,l:20};
var plotWidth = canvasWidth - margin.l - margin.r,
    plotHeight = canvasHeight - margin.t - margin.b;

var plot = d3.select('#canvas')
	.append('svg')
	.attr('width', canvasWidth)
	.attr('height', canvasHeight)
	.append('g')
	.attr('transform', 'translate('+margin.l+','+margin.t+')');

var r_additive = 40;
var op_additive = .25;

for (i=0; i<3; i++){
    
    var cx_random = Math.random()*canvasWidth;
    var cy_random = Math.random()*canvasHeight;
    var stroke_random = Math.random()*50;
    var gray_random = Math.floor(Math.random()*255);
    var gray_random2 = Math.floor(Math.random()*50+205);
    
    
plot.append('circle')
	.attr('cx', cx_random)
	.attr('cy', cy_random)
	.attr('r', r_additive)
    .style('opacity', op_additive)
	.style('fill', 'rgb(' + gray_random2 + ',' + gray_random2 + ',' + gray_random2 + ')')
	.style('stroke', 'rgb('+gray_random+','+gray_random+','+gray_random+')')
    .style('stroke-width', stroke_random)
    
    
    r_additive = r_additive*2.25;
    op_additive = op_additive+.25
    
}