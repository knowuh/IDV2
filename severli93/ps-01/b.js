/**
 * Created by xingyueli on 1/19/16.
 */

var plot = d3.select('.canvas' )
    .append('svg')
    .attr('width',500)
    .attr('height',500)
    .append('g')
    .attr('class','plot')


plot
    .append('circle')
    .attr('r',40)
    .attr('cx',100)
    .attr('cy',50)
    .style('fill','rgba(255,0,0,.5)')

plot
    .append('circle')
    .attr('r',40)
    .attr('cx',100)
    .attr('cy',150)
    .style('fill','rgba(255,0,0,.5)')

plot
    .append('circle')
    .attr('r',40)
    .attr('cx',100)
    .attr('cy',250)
    .style('fill','rgba(255,0,0,.5)')