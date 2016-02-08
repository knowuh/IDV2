/**
 * Created by jiani90 on 1/24/16.
 */

//var margin = {t:20,r:20,b:20,l:20};
//var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
//    height = document.getElementById('plot').clientHeight-margin.t-margin.b;


var svg = d3.select("body")
    .append("svg")
    .attr("width", 1500)
    .attr("height", 1000);

//Draw the Circle
var c1=svg
    .append("circle")
    .attr("cx", 500)
    .attr("cy", 200)
    .attr("r", 200)
    .style("fill","pink")
    .style("opacity",.8)


var c2=svg
    .append("circle")
    .attr("cx", 700)
    .attr("cy", 360)
    .attr("r", 200)
    .style("fill","pink")
    .style("opacity",.8)


var c3=svg
    .append("circle")
    .attr("cx", 360)
    .attr("cy", 360)
    .attr("r", 200)
    .style("fill","pink")
    .style("opacity",.8)
