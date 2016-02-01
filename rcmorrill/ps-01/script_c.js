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



var data = [{cx:67, cy:54, r:43},
 			{cx:345, cy:12, r:12},
 			{cx:87, cy:432, r:235}
			];

plot.selectAll('circle')
	.data(data)
	.enter()
	.append('circle')
	.attr('cx',function(d){return d.cx})
	.attr('cy',function(d){return d.cy})
	.attr('r',function(d){return d.r});

