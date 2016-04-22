var m = {t:40,r:40,b:40,l:40},
    w = d3.select('.plot').node().clientWidth - m.l - m.r,
    h = d3.select('.plot').node().clientHeight - m.t - m.b;

var plot = d3.select(".plot")
    .append('svg')
    .attr('class', 'canvas')
	.attr('width', w)
	.attr('height', h)
	.append('g')
	//.attr('transform', 'translate('+m.l+','+m.t+')');


var scaleX = d3.scale.linear().domain([1,10]).range([m.r,w-m.l]),
    scaleY = d3.scale.linear().domain([1,10]).range([h-m.b,m.t]),
    scaleR = d3.scale.linear().domain([1,10]).range([4,24])

var axisX = d3.svg.axis()
        .orient("bottom")
        .scale(scaleX)
        .ticks(0)

d3.select('svg').append('g').attr('class','axis axis-x')
    .attr('transform','translate(0,'+(h+m.b)+')')
    .call(axisX)
    .append('text')
    .text('When did you last draw a picture?')
    .attr('transform','translate('+(w/2-m.l*3)+','+30+')');




var setData = function (data) {
    console.log(data)
    
    var circles = plot.each( function(d,i){
        
        var draw_circles = d3.select(this)
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d){ return scaleX(d.whenwasthelasttimeyoudrewapicture) })
        .attr('cy', function(d){ return scaleY(d.whenwasthelasttimeyouwenttothemfa) })
        .attr('r', function(d){ return scaleR(d.whenwasthelasttimeyouwenttothebeach) })
        .style('fill', 'red')
        .style('opacity', 0.5)
    })


};
    
$(document).ready( function () {
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
});
    
    


