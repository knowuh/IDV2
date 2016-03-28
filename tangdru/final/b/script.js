//var margin = {t:100,r:50,b:100,l:50},
//    width = document.getElementById('canvas').clientWidth - margin.l - margin.r,
//    height = document.getElementById('canvas').clientHeight - margin.t - margin.b;
//
//var canvas = d3.select('.canvas')
//    .append('svg')
//    .attr('width', width + margin.l + margin.r)
//    .attr('height', height + margin.t + margin.b)
//    .append('g')
//    .attr('transform','translate('+margin.l+','+margin.t+')');

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

queue()
    .defer(d3.csv, 'data/infected_24march2016.csv', parseInfected)
    .defer(d3.json, 'data/zika.json')
    .defer(d3.json, 'data/map.json')
    .await(DataLoaded)

function DataLoaded(err, infected, zikaTweets, mapData){
    console.log(infected);
    console.log(zikaTweets);

    
//    var baseMap = svg.append( "g" );
    var projection = d3.geo.equirectangular()
                                .scale(200)
                                .translate([width/2, height/2])
                                .precision(.1);

    var geoPath = d3.geo.path().projection(projection);
        svg.append('g')
            .selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("fill", "#DEDDDD")
            .attr("stroke", "#ADACAC")
            .attr("d", geoPath);
    
    svg.append('circle')
            .data(infected)
            .enter()
            .attr("transform", function(d) {return "translate(" + projection([ d.lng, d.lat]) + ")"})
//            .attr('cx', function(d){return projection(d.lat);})
//            .attr('cy', function(d){return projection(d.lng);})
            .attr('r', d.confirmed/10)
            .style('fill','black');
       
}



function parseInfected(d){
    return {
        region: d.Region,
        country: d.Country,
        state: d.State,
        lat: +d.lat,
        lng: +d.lng,
        confirmed: +d.confirmed
    }
}

