/**
 * Created by xingyueli on 4/3/16.
 */
var margin = {t:20,r:50,b:20,l:30}
var width1 = document.getElementById('MapPlot1').clientWidth - margin.r-margin.l,
    height1 = document.getElementById('MapPlot1').clientHeight - margin.t -margin.b;

var width2= document.getElementById('MapPlot2').clientWidth - margin.r-margin.l,
    height2 = document.getElementById('MapPlot2').clientHeight - margin.t -margin.b;
//console.log(width1)
//console.log(height1)
var map1 = d3.select("#MapPlot1")
    .append('svg')
    .attr('width',width1)
    .attr('height',height1)
    .append('g')
    .attr('class','canvas-map1')
    .style('fill',"#aeaeae")
    .attr('transform','translate('+(margin.l)*0+','+margin.t+')');

var map2 = d3.select("#MapPlot2")
    .append('svg')
    .attr('width',width2)
    .attr('height',height2)
    .append('g')
    .attr('class','canvas-map1')
    .style('fill',"pink")
    .attr('transform','translate('+(margin.l)+','+margin.t+')');

//TODO: set up a mercator projection, and a d3.geo.path() generator
//Center the projection at the center of Boston
var bostonLngLat = [-71.088066,42.315520]; //from http://itouchmap.com/latlong.html
var hefeiLongLat = [117.330551,31.871727]
//path generator boston
var projection1 = d3.geo.mercator()
    .translate([(width1/2),(height1/2)])
    .center([bostonLngLat[0],bostonLngLat[1]])
    .scale(120000/1.3)

//path generator hefei
var projection2 = d3.geo.mercator()
    .translate([width1/2,height1/2])
    .center([hefeiLongLat[0],hefeiLongLat[1]])
    .scale(20000 /1.2)

//TODO: create a geo path generator
var pathGenerator1 = d3.geo.path().projection(projection1);
var pathGenerator2 = d3.geo.path().projection(projection2);
//
//TODO: create a color scale
//var colorScale=d3.scale.linear().domain([0,34]).range(['white','red']);
//var colorType=["#9030FF",'2FFF22','yellow',"#FF34D6"];

//TODO: create a d3.map() to store the value of airbnb room number per block group
var airbnbRoom = d3.map()
//TODO: import data, parse, and draw


var Key = "hVAGGTZYJn3vPA29Oi1iqBRSquWXXpmG331W20Ql"
var Secret = "a53Hn3Z461vithBUzVhxVNnMRrTYh6rWYu6cw75n"
var baseFlickrUrl = "https://api.500px.com/v1/photos/search?format=json&nojsoncallback=1&consumer_key="+ Key //format=json requires a json file

var url1Name = baseFlickrUrl + "&term=Boston&rpp=100"//&nojsoncallback=1 means return json file
var url2Name = baseFlickrUrl + "&term=Hefei&rpp=100"

queue()
    //.defer(d3.json,'data/bos_census_blk_group.geojson')
    .defer(d3.json,'data/bos_neighborhoods.json')
    .defer(d3.json,'data/hefei.geojson')
    .defer(d3.json,''+url1Name)
    .defer(d3.json,''+url2Name)
    //.defer(d3.csv,'data/boston_listings_cleaned.csv',parseData)
    .await(dataLoaded)

function dataLoaded (err,boston,hefei,url1,url2){
    //var newCensusFeatures=census.features;
    //console.log(census)
    //console.log(hefei)
    //console.log("hefei data is ",hefei)
    //console.log('features are ',newCensusFeatures);
//data sources
    d3.select('#searchAPIUrl1').node().innerHTML = 'Data source1: URL:'+url1Name;
    d3.select('#searchAPIUrl2').node().innerHTML = 'Data source2: URL:'+url2Name;
    console.log(url1)
    console.log(url2)
//0.draw legend
//draw initial map
    drawInitial(boston,hefei,url1,url2);}

function drawInitial(boston,hefei,url1,url2){
    var newCensusFeatures=boston.features;
    //console.log('features are ',newCensusFeatures);


//1. draw boston outline to show the neighbor blocks' name
    mapA = map1
        .append('g')
        .attr('class','MapBoston')
        .selectAll('.map-block')
        .data(newCensusFeatures)

    var mapAEnter = mapA.enter()
        .append('path')
        .attr('class','map-block')
        .attr('d', pathGenerator1)
        .style('fill',function(d){return '#FFEB9D'})
        .style('fill-opacity', 0.7)

    var tip1 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>City:</strong> <span style='color:red'>" +Hefei+ "</span>";})

    var mapCenter=map1
        .append('g')
        .attr('class','CenterP')
        mapCenter
        .append('circle')
        .attr('class','BCenter')
        .attr('r',15)
        .style('fill','rgba(250,0,10,.5)')
        .attr('transform','translate('+(width1/2)+','+(height1/2)+')')
        .call(tip1)

    //node1
    var fillColor1 = d3.scale.category10();
    var nodes1 = d3.range(100).map(function(i) {return {index: i};});
    var force1 = d3.layout.force()
        .nodes(nodes1)
        .size([(width1+width2), (height1+height2)/2])
        .on("tick", tick1)
        .start();
    function tick1(e){
        // Push different nodes in different directions for clustering.
        var k = e.alpha;
        nodes1.forEach(function(o, i) {
            o.y += .00002*k//2*(i & 2 ? k : -k)//i & 1 ? k : -k;
            o.x += .00002*k//2*(i & 2 ? k : -k)//i & 2 ? k : -k;
        });
        mapANodes.attr("cx", function(d) {  return .5*(d.x); })
            .attr("cy", function(d) { return .5*(d.y); });
    }
    mapANodes = map1
        .append('g')
        .attr('class','nodesImage')
        .selectAll('.node1')
        .data(nodes1)

    mapANodes
        .enter()
        .append('circle').attr('transform','translate('+(-width1/2)*0+','+(height1/2)*0.5+')')
        .attr('class','node1')
        .attr('cx',function(d){return d.x})
        .attr('cy',function(d){return d.y})
        .attr('r',4)
        .style('fill',function(d,i){return fillColor1(i)})
        .call(force1.drag)
        .on('mousedown',function(){d3.event.stopPropagation();})
        .on('mouseover',function(d,i){console.log(url1.photos[i])})
        //.on('click',function(d))
    //document.getElementById('btn').onclick = function() {
    //    var val = document.getElementById('imagename').value,
    //        src = 'http://webpage.com/images/' + val +'.png',
    //        img = document.createElement('img');
    //
    //    img.src = src;
    //    document.body.appendChild(img);
    //}

    map1.style('opacity',1e-6)
        .transition().duration(1000).style('opacity',1);
    d3.select("#MapPlot1")
        .on('mousedown',mousedown1)


    function mousedown1() {
        nodes1.forEach(function(o, i) {
            o.x += (Math.random() - .5) * 40;
            o.y += (Math.random() - .5) * 40;
        });
        force1.resume();
    }


    mapB = map2
        .append('g')
        .selectAll('.map-block2')
        .data(hefei.features)

    var mapBEnter = mapB.enter()
        .append('g')
        .attr('class','map-block2')
        .append('path')
        .attr('d', pathGenerator2)
        .attr('transform','translate('+(width1/2)*0 +','+(height1/2) *.2+')')
        .style('fill',function(d){return '#ADC0FB'})
        .style('stroke-width','.3px')
        .style('fill-opacity',.7)

    var mapCenterH=map2
        .append('g')
        .attr('class','CenterP')
    mapCenterH
        .append('circle')
        .attr('class','HCenter')
        .attr('r',15)
        .style('fill','rgba(250,0,10,.5)')
        .attr('transform','translate('+(width1/2) +','+(height1/2)+')')

   //node2
    var fillColor2 = d3.scale.category10();
    var nodes2 = d3.range(100).map(function(i) {return {index: i};});
    var force2 = d3.layout.force()
        .nodes(nodes2)
        .size([(width1+width2), (height1+height2)/2])
        .on("tick", tick2)
        .start();
    function tick2(e){
        // Push different nodes in different directions for clustering.
        //console.log('e',e);
        var k = e.alpha;
        //console.log('k',k);
        nodes2.forEach(function(o, i) {
            o.y += .00002*k;//i & 1 ? k : -k;
            o.x += .00002*k;//i & 2 ? k : -k;
        });
        mapBNodes.attr("cx", function(d) { return .5*(d.x); }).attr("cy", function(d) { return .5*(d.y); });
    }
    mapBNodes = map2
        .append('g')
        .attr('class','nodesImage')
        .selectAll('.node2')
        .data(nodes2)
    mapBNodes
        .enter().append('circle').attr('transform','translate('+(-width1/2)*0+','+(height1/2) *.5+')')
        .attr('class','node2')
        .attr('cx',function(d){return d.x})
        .attr('cy',function(d){return d.y})
        .attr('r',4)
        .style('fill',function(d,i){return fillColor2(i)})
        .call(force2.drag)
        .on('mousedown',function(){d3.event.stopPropagation();})
        .on('mouseover',function(d,i){console.log(url2.photos[i])})
    map2.style('opacity',1e-6)
        .transition().duration(1000).style('opacity',1);
    d3.select('#MapPlot2')
        .on('mousedown',mousedown2)

    function mousedown2() {
        nodes2.forEach(function(o, i) {
            o.x += (Math.random() - .5) * 40;
            o.y += (Math.random() - .5) * 40;
        });
        force2.resume();}

//photos

    var grid = document.querySelector('.grid');
    var msnry = new Masonry( grid, {
        //columnWidth: "100px"
    });

    grid.addEventListener( 'click', function( event ) {
        // don't proceed if item was not clicked on
        if ((!matchesSelector( event.target, '.grid-item'))&&(!matchesSelector( event.target, '.grid-item2'))){
            return;}
        //if (!matchesSelector( event.target, '.grid-item2')){
        //    return;
        //}
        // change size of item via class
        event.target.classList.toggle('grid-item--gigante');
        // trigger layout
        msnry.layout();
    });


}