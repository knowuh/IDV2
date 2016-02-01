/**
 * Created by jiani90 on 1/31/16.
 */
var margin = {t:20,r:20,b:20,l:20};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
    height = document.getElementById('plot').clientHeight-margin.t-margin.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.l+margin.r)
    .attr('height',height+margin.t+margin.b)
    .append('g')
    .attr('class','plot')
    //.attr('transform','translate()') --> complete this line here
    .attr('transform','translate('+margin.l +',' + margin.r +')')

//Start with 100 symbols
var numOfSymbols = 100;

//Create an array, generate objects to push into the array
//Attributes of these symbols are
// --> x position: between 0 and width
// --> y position: betewen 0 and height
// --> size: between 0 and 100x100
// --> type: circle or square
// --> color
var symbols = [];

for (var i = 0; i < numOfSymbols; i++) {
    symbols.push({x:getRandomInt(0, width), y:getRandomInt(0, height), size:getRandomInt(0, 50), color:d3.rgb(getRandomInt(0, 255),getRandomInt(0, 255),getRandomInt(0, 255)), type:getRandomInt(0, 1)});
}

//With the array you've created and populated, draw circles to represent these symbols
symbols.forEach(function(symbol){
    // differentiate type
    if (symbol.type == 0) {
        // circle
        plot
            .append('rect1')
            .attr('x', symbol.x)
            .attr('y', symbol.y)
            .attr('width', symbol.size)
            .attr('height', symbol.size)
            .style('fill',symbol.color);
    } else {
        // square
        plot
            .append('rect')
            .attr('x', symbol.x)
            .attr('y', symbol.y)
            .attr('width', symbol.size)
            .attr('height', symbol.size)
            .style('fill',symbol.color);
    }
})


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}