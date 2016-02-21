/**
 * Created by June on 16/2/8.
 */

// This is a list of *some* of the spreadsheet column names.  see spreadsheet.js
var columnVariables = [
    "criticalcommunication",
    "criticalcommunication_2",
    "graphicdesign",
    "graphicdesign_2",
    "howlongdidittakeyoutogethere",
    "howmanyhoursperweekcanyoudevotetothisclass",
    "howmuchsleepdidyougetlastnight",
    "howtallareyou",
    "javascriptwebdevelopment",
    "javascriptwebdevelopment_2",
    "whenwasthelasttimeyoudrewapicture",
    "whenwasthelasttimeyouwenttothebeach",
    "whenwasthelasttimeyouwenttothemfa"
];


var drawGraph = function(data) {
    var svg        = d3.select("#survey");
    var radius     = 100 / data.length;
    var width      = 600 - radius;
    var height     = 400 - radius;
    var leftMargin = 40;
    svg.style("height",height)
        .style("width",width+50+100)

    var xScale = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundPoints([50, width]);

    var yScale = d3.scale.linear()
        .domain([0, 10])
        .range([height, (100/data.length)+20]);

    var colorScale = d3.scale.linear()
        .domain([0, data.length])
        .range([0, 360]);

    var axisY = d3.svg.axis()
        .orient('left')
        .scale(yScale)
        .ticks(5);
    svg.append("g")
        .call(axisY)
        .attr("transform","translate(30,-3)")
        .attr("class","axis")
        .style("stroke","black")
        .style("stroke-width",".1");









    svg.selectAll(".circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class","circle")
        .attr("cx",function(d,i){return xScale(i);})
        .attr("cy",function(d){console.log(d.howlongdidittakeyoutogethere);return yScale(d.howlongdidittakeyoutogethere);})
        .attr("transform","translate(30,-3)")
        .style("fill",function(d){
            console.log(d.howdidyougethere);
            if(d.howdidyougethere=="Train")
                return "#359ba1";
            if(d.howdidyougethere=="Manual transportation (walk / bike / wheelchair / roller blades)")
                return "#3565a1";
            if(d.howdidyougethere=="Bus")
                return "#35a171";
            else
                return "gray";
        })
        .attr("r","20")
        .on("mouseover", function(d) {
            d3.select(this)
                .style("opacity", ".5");
            var xPosition=parseFloat(d3.select(this).attr("cx"));
            var yPosition=parseFloat(d3.select(this).attr("cy"))+35;
            console.log(xPosition,yPosition);
            svg.append("text")
                .text(d.name)
                .attr("x",xPosition)
                .attr("y",yPosition)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .attr("class","circletext")
                .attr("transform","translate(30,-3)")
                .style("pointer-events", "none");


            console.log(d.name);
               // .append("text")
               // .text(function(d){console.log(d.name); return d.name;});
               // .attr()

        })
        .on("mouseout",function(d){
            d3.select(this)
                .style("opacity","1");
            d3.selectAll(".circletext")
                .remove();
        })



};




$(document).ready(function () {
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", drawGraph);
});

