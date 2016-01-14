
//Set up the drawing environment here (based on code from d3 class, by Siqi Zhu)
var margin = {t:20,r:20,b:20,l:20};
var width = document.getElementById('myCanvas').clientWidth-margin.l-margin.r,
	height = document.getElementById('myCanvas').clientHeight-margin.t-margin.b;


var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.l+margin.r)
    .attr('height',height+margin.t+margin.b)
    .append('g')
    .attr('class','plot')
.attr('transform','translate('+margin.l+','+margin.t+')')