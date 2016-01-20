//Make an SVG Container
var svg = d3.select("body").append("svg")
                                    .attr("width", 1260)
                                    .attr("height", 700);

//Draw the Circle
var circle1=svg
    .append("circle")
    .attr("cx", 360)
    .attr("cy", 350)
    .attr("r", 200)
    .style("fill","darkslategray")
    .style('opacity',.4);

var circle2=svg
    .append("circle")
    .attr("cx", 630)
    .attr("cy", 350)
    .attr("r", 200)
    .style("fill","darkslategray")
    .style('opacity',.4);

var circle3=svg
    .append("circle")
    .attr("cx", 900)
    .attr("cy", 350)
    .attr("r", 200)
    .style("fill","darkslategray")
    .style('opacity',.4);