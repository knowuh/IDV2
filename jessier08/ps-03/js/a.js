var m = {t:50,r:50,b:50,l:50},
    w = d3.select('.plot').node().clientWidth - m.l - m.r,
    h = d3.select('.plot').node().clientHeight - m.t - m.b;

var plot = d3.select(".plot")
    .append('svg')
    .attr('class', 'canvas')
	.attr('width', w)
	.attr('height', h);

var scaleX = d3.scale.linear().domain([0,10]).range([m.l,w-m.r]),
    scaleY = d3.scale.linear().domain([0,10]).range([h-m.t,m.b]),
    scaleR = d3.scale.linear().domain([1,10]).range([2,18]);

var axisX = d3.svg.axis()
    .orient('bottom')
    .scale(scaleX)
    .ticks(0);

var axisY = d3.svg.axis()
    .orient('left')
    .scale(scaleY)
    .ticks(0);

var setData = function (data) {
    

};
    
$(document).ready( function () {
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
});
    
    


