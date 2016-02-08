var margin = {t:50,r:50,b:50,l:50};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
	height = document.getElementById('plot').clientHeight-margin.t-margin.b;


var plot = d3.select('.canvas')
	.append('svg')
	.attr('width',width+margin.l+margin.r)
	.attr('height',height+margin.t+margin.b)
	.append('g')
	.attr('class','plot')
	.attr('transform', 'translate (20,'+margin.r+')');


plot.append('circle')
	.attr('cx','50')
	.attr('cy','50')
	.attr('r','10');

plot.append('circle')
	.attr('cx','124')
	.attr('cy','345')
	.attr('r','56');


plot.append('circle')
	.attr('cx','300')
	.attr('cy','50')
	.attr('r','100');