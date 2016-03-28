var width = 960, 
    height = 540;



var svg = d3.select( "#plot" )
  .append( "svg" )
  .attr( "width", width )
  .attr( "height", height );

var canvas = d3.select('#plot2')
    .append('canvas')
    .attr('width',width)
    .attr('height',height)
    .node(),
    ctx = canvas.getContext('2d');

var linearGradient = ctx.createLinearGradient(0,0,width,height);
linearGradient.addColorStop(0,'blue');
linearGradient.addColorStop(.5,'purple');
linearGradient.addColorStop(1,'red');
ctx.fillStyle = linearGradient;
ctx.fillRect(0,350,width,height);


var baseMap = svg.append( "g" );   
var points = svg.append("g");         

var equirectangular =  d3.geo.equirectangular()
                            .scale(200)
                            .translate([width / 2, height / 2])
                            .precision(.1);

var projection = equirectangular;

var geoPath = d3.geo.path().projection(projection);


d3.json("map.json", function(json) {
  baseMap.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("fill", "#DEDDDD")
    .attr("d", geoPath);
});

var cx = function (d) { return projection([d.x, d.y])[0]; }
var cy = function (d) { return projection([d.x, d.y])[1]; }

d3.json("/data/zika-new.json", function(json) {
  points.selectAll("circle")
    .data(json)
    .enter()
    .append("circle")
    .attr('r', function(data)  { return data.favorite_count || 1 })
    .attr('cx', cx)
    .attr('cy', cy)
    .attr("fill", "hsla(0, 80%, 50%, 0.5)");
});




