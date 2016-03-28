var canvasWidth = document.getElementById('canvas').clientWidth,
    canvasHeight = document.getElementById('canvas').clientHeight;

var margin = {t:20,r:20,b:20,l:20};
var plotWidth = canvasWidth - margin.l - margin.r,
    plotHeight = canvasHeight - margin.t - margin.b;

var plot = d3.select('#canvas')
    .append('svg')
    .attr('width',canvasWidth)
    .attr('height',canvasHeight)
    .append('g');

plot
    .append('circle')
    .attr('cy',100)
    .attr('cx',100)
    .attr('r',50)
    .style('fill', 'none')
    .style('stroke','black')
    .style('stroke-width','10px')

plot
    .append('circle')
    .attr('cy',300)
    .attr('cx',300)
    .attr('r',75)
    .style('fill','#C6466A');

plot
    .append('circle')
    .attr('cy',250)
    .attr('cx',30)
    .attr('r',50)
    .style('fill','#678CA5');




