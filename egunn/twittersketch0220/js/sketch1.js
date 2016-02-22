//figure out why the plot div height has to be set to a hard (rather than percentage) value //in the CSS


//set some margins and record width and height of window
var margin = {t:25,r:40,b:25,l:40};

var width = document.getElementById('plot1').clientWidth - margin.r - margin.l,  
    height = document.getElementById('plot1').clientHeight - margin.t - margin.b;

/*
//set up scales for plotting the data
var xScale = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundPoints([margin.l, width]);

var yScale = d3.scale.linear()
    .domain([10,1])
    .range([0,100]);

var colorScale = d3.scale.linear()
    .domain([0, data.length])
    .range([0, 360]);
 */

//select the HTML plot element by id 
var canvas = d3.select(".plot");

plot = canvas.append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

data=[];

for(i=0;i<100;i++){ 
    var x=Math.random()*350;
    var y=Math.random()*350;
    var r=Math.random()*20;
    
    var newObj = {x:x, y:y, r:r}
    data.push(newObj)
};


//console.log(data);

circles = plot.selectAll('circ')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx',function(d){return d.x})
    .attr('cy',function(d){return d.y})
    .attr('r',function(d){return d.r})
    .style('fill',"blue");
    
/*
for (i=0;i<100;i++){
    
    plot.append('circle')
    .attr('cx',)
    .attr('cy',)
    .attr('r',)
    .style('fill',"blue");
    
}*/