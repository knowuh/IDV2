
var width = 1000, height = 480;

var svg = d3.select( "body" )
  .append( "svg" )
  .attr( "width", width )
  .attr( "height", height );

var baseMap = svg.append( "g" );      //<g></g>
var points = svg.append("g");         //<g></g>

var albersProjection = d3.geo.albers().scale(300);
var equirectangular =  d3.geo.equirectangular().scale(200);

var projection = equirectangular;

var geoPath = d3.geo.path().projection(projection);


d3.json("map.json", function(json) {
  baseMap.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("fill", "#ccc")
    .attr("d", geoPath);
});

//
//  var function projection(values) {...  return []}
//  values  = [x, y]
var cx = function (d) { return projection([d.x, d.y])[0]; }
var cy = function (d) { return projection([d.x, d.y])[1]; }

d3.json("zika-new.json", function(json) {
  points.selectAll("circle")
    .data(json)
    .enter()
    .append("circle")
    .attr('r', function(data)  { return data.favorite_count || 1 })
    .attr('cx', cx)
    .attr('cy', cy)
    .attr("fill", "hsla(0, 80%, 50%, 0.5)");
});
