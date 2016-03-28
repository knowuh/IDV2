var width = 960, 
    height = 540;

var svg = d3.select( "#plot" )
  .append( "svg" )
  .attr( "width", width )
  .attr( "height", height );

var canvas = d3.select('#plot')
    .append('canvas')
    .attr('width',width)
    .attr('height',height)
    .node(),
    ctx = canvas.getContext('2d');

var linearGradient = ctx.createLinearGradient(0,0,width,height);
linearGradient.addColorStop(0,'#618096');
linearGradient.addColorStop(.5,'#7D9BAD');
linearGradient.addColorStop(1,'#618096');
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
    .attr("stroke", "#ADACAC")
    .attr("d", geoPath);
});

var cx = function (d) { return projection([d.x, d.y])[0]; }
var cy = function (d) { return projection([d.x, d.y])[1]; }

d3.json("/data/zika-new.json", function(tweet) {
  points.selectAll("circle")
    .data(tweet)
    .enter()
    .append("circle")
    .attr('r', function(data)  { return data.favorite_count || 10 })
    .attr('cx', cx)
    .attr('cy', cy)
    .attr("fill", "hsla(0, 80%, 50%, 0.5)");
});

//d3_queue.queue()
//    .defer(d3.csv,'/data/infected_24march2016.csv',parse)
//    .await(dataLoaded);
//
//function parse(d){
//    return {
//        region: d.Region,
//        country: d.Country,
//        state: d.State,
//        lat: +d.lat,
//        lng: +d.lng,
//        confirmed: d.confirmed
//    }
//}
//
