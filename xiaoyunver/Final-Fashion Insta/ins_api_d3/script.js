var margin = {t:50,l:50,b:50,r:50},
    width = document.getElementById('map').clientWidth-margin.l-margin.r,
    height = document.getElementById('map').clientHeight-margin.t-margin.b;

var svg = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.l+margin.r)
    .attr('height',height+margin.t+margin.b);
    // .append('g').attr('class','map')
    // .attr('transform',"translate("+margin.l+","+margin.t+")");

// Map------------------------------------------
var projection = d3.geo.equirectangular()
    .scale(180)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

var worldMap = svg.append('g')
    .attr('class','worldMap');
var mapPath = worldMap.append('g')
    .attr('class','mapPath');

    mapPath.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);
//--------------------------------------------

// Zoom-----------------------------------------
var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        worldMap.attr("transform","translate("+
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        worldMap.selectAll("path")
            .attr("d", path.projection(projection));
    });
//----------------------------------------------

// Timeline ------------------------------------
// var testData = [
//     {times: [
//         {"color": "#364B5F","starting_time": 1355752800000, "ending_time": 1355759900000},
//         {"color": "#288784","starting_time": 1355767900000, "ending_time": 1355774400000}]},
//     {times: [
//         {"color": "#6DC27D","starting_time": 1355759910000, "ending_time": 1355761900000}]},
//     {times: [
//         {"color": "#EFEE69","starting_time": 1355761910000, "ending_time": 1355763910000}]},
// ];
// var chart = d3.timeline();
// var timeLineChart = d3.select("#timeline1").append("svg").attr("width", 500)
//     .datum(testData).call(chart);
//--------------------------------------------------
//Timeline(Visual)-----------------------------------------
var timeLine = d3.select('#timeline1')
    .append('svg')
    .attr('width','700');

timeLine.append('line')
    .attr('x1','100')
    .attr('y1','50')
    .attr('x2','600')
    .attr('y2','50')
    .style('stroke','black')
    .style('stroke-width','3');

timeLine.append('circle')
    .attr('cx','100')
    .attr('cy','50')
    .attr('r','15')
    .style('fill','#364B5F');

timeLine.append('circle')
    .attr('cx','200')
    .attr('cy','50')
    .attr('r','15')
    .style('fill','#288784');

timeLine.append('circle')
    .attr('cx','350')
    .attr('cy','50')
    .attr('r','15')
    .style('fill','#6DC27D');

timeLine.append('circle')
    .attr('cx','600')
    .attr('cy','50')
    .attr('r','15')
    .style('fill','#EFEE69');

timeLine.append('text')
    .text('Fashion Week')
    .attr('x','100')
    .attr('y','20')
    .attr('text-anchor','middle');

timeLine.append('text')
    .text('New York')
    .attr('x','100')
    .attr('y','80')
    .attr('text-anchor','middle');

timeLine.append('text')
    .text('London')
    .attr('x','200')
    .attr('y','80')
    .attr('text-anchor','middle');

timeLine.append('text')
    .text('Milan')
    .attr('x','350')
    .attr('y','80')
    .attr('text-anchor','middle');

timeLine.append('text')
    .text('Paris')
    .attr('x','600')
    .attr('y','80')
    .attr('text-anchor','middle');
//--------------------------------------------------
//Loading Stat--------------------------------------
var loadingStat = svg.append('text')
    .attr('x',width/2)
    .attr('y',height/2);
//----------------------------------------

var drawDot = function(loadedData){
    console.log('Numbers of Ins-Data: '+instagramData.length);
    console.log(loadedData);
    console.log('Drwaing');
    // var dots = svg.append('g')
    //     .attr('class','dots');
    var dots = worldMap.append('g')
        .attr('class','dots');

    dots.selectAll('circle')
        .data(loadedData)
        .enter()
        .append('circle')
        .filter(function(d){
            return d.location!=null;
        })
        .attr('r','5')
        .attr('cx',function(d){

            return projection([d.location.longitude,d.location.latitude])[0];
        })
        .attr('cy',function(d){
            return projection([d.location.longitude,d.location.latitude])[1];
        })
        .on('mouseover',function(d){
            var xPosition = parseFloat(d3.select(this).attr("cx"));
            var yPosition = parseFloat(d3.select(this).attr("cy"))+200;
            console.log(d);
            var imgData = d;
            //Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#insImg")
                .attr('src',function(){
                    return imgData.images.low_resolution.url;
                });
            // d3.select('#userName')
            //     .text(imgData.user.full_name);
            d3.select('#content')
                .text(imgData.caption.text);
            d3.select('#location')
                .text(imgData.location.name);

            //Show the tooltip
            d3.select("#tooltip").classed("hidden", false);
        })
        .on('mouseout',function(){
            d3.select("#tooltip").classed("hidden", true);
        });
    loadingStat.transition()
        .duration(1500)
        .remove();
}
var instagramData = new Array();
var accessToken = '3044801826.1fb234f.09ff609554ec450fa01924bd5b6d8e3d';
var userId = '10051934';
var mediaCount = 100;  // Numbers of media.


var getdata = function(){
    var url = "https://api.instagram.com/v1/users/"+userId+"/media/recent/?access_token="+accessToken;
    var getRequest = function(){
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: url,
            success: function(data) {
                //console.log(data);
                //console.log(data.data);
                console.log('Loading: '+instagramData.length+' of '+mediaCount);
                loadingStat.text('Loading: '+instagramData.length+' of '+mediaCount);

                instagramData = instagramData.concat(data.data);
                if(instagramData.length<mediaCount){
                    url = data.pagination.next_url;
                    getRequest();
                }
                else {
                    console.log('data loaded');
                    loadingStat.text('Data Loaded');
                    drawDot(instagramData);
                }

            }
        })


}
    getRequest();
};

//TODO:Start getting data from Instagram;
getdata();


queue()
    .defer(d3.json, "data/world-50m.json")
    .defer(d3.csv, "data/countries list.csv")
    .await(function(err, world,list){
        mapPath.insert("path", ".graticule")
            .datum(topojson.feature(world, world.objects.land))
            .attr("class", "land")
            .attr("d", path);

        mapPath.insert("path", ".graticule")
            .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
            .attr("class", "boundary")
            .attr("d", path);
        //Map zoom and pan
        //svg.call(zoom);

         //   .on('click',mapZooming);

        // mapLabel.selectAll('text')
        //     .data(list)
        //     .enter()
        //     .append('text')
        //     .text(function(d){return d.name;})
        //     .attr('class','mapLabel')
        //     .attr('x',function(d){return projection([d.longitude,d.latitude])[0];})
        //     .attr('y',function(d){return projection([d.longitude,d.latitude])[1];});
    });

// function mapZooming(d) {
//     var x, y, k;
//
//     if (d && centered !== d) {
//         var centroid = path.centroid(d);
//         x = centroid[0];
//         y = centroid[1];
//         k = 4;
//         centered = d;
//     } else {
//         x = width / 2;
//         y = height / 2;
//         k = 1;
//         centered = null;
//     }
//
//     mapPath.selectAll("path")
//         .classed("active", centered && function(d) { return d === centered; });
//
//     mapPath.transition()
//         .duration(750)
//         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
//         .style("stroke-width", 1.5 / k + "px");
// }


