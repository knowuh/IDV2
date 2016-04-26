/**
 * Created by KiniLuo on 2/7/16.
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

/**************************************************
 * this is the function that updates the D3 graph *
 * @param data – the google spreadsheet data      *
 **************************************************/
var drawGraph = function (data) {
    var svg        = d3.select("#survey");
    var radius     = 100 / data.length;
    var width      = 600 ;
    var height     = 400 ;
    var leftMargin = 40;

    // A d3 ordinal scale is for discrete categories or names see: https://github.com/mbostock/d3/wiki/Ordinal-Scales
    var xScale = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundPoints([leftMargin, width]);

    // A linear Y axis scale, all our values range from 0-10
    var yScale = d3.scale.linear()
        .domain([10, 0])
        .range([height, 0]);

    var colorScale = d3.scale.linear()
        .domain([0, data.length])
        .range([0, 360]);

    var axisA=d3.svg.axis()
        .scale(yScale)
        .orient("bottom")
        .tickSize(0,1)
        .tickPadding(5);

    svg
        .append('g')
        .attr('transform','translate(20,450)')
        .call(axisA);

    var circles = svg.selectAll("circle").data(data);

    circles
        .enter()
        .append("circle")
        .append("title")
        .text(function (d) {
            return "name:" + d.name
        });

    circles
        .attr('r', radius)
        .attr('fill', function (d, i) {
            var hue = colorScale(i);
            return 'hsla(' + hue + ', 20%, 40%, 1.0)';
        })
        .attr("title", function (d) {
            return d.name;
        })
        .attr("cy", function (d, i) {
            return xScale(i);
        })
        .attr("cx", function (d) {
            // Use the array above e.g. d[columnVariables[0]] or d['keyname'];
            var columnData = parseInt(d["whenwasthelasttimeyoudrewapicture"]);
            return yScale(columnData);
        })
        .attr("transform","translate(20,-200)")
        .call(toolTip);

    var line1=svg.append('line')
        line1
        .attr('x1', 0)
        .attr('x2', height+42)
        .attr('y1', 450)
        .attr('y2', 450)
        .attr('stroke',"gray")
        .attr("stroke-width","2px");

//var colorRandom;

    var numberOfLine=12;
    for (var i= 0;i<numberOfLine;i++){


        var Array=[0,40,80,120,160,200,240,280,320,360,400,440];
        var x1=1+Array[i];

        var line2=svg.append('line');

        line2
                .attr('x1', x1)
                .attr('x2', x1)
                .attr('y1', 0)
                .attr('y2', 450)
                .attr('stroke',"gray")
            .attr("stroke-width","2px");


    }

    function toolTip(selection){
        selection
            .on('mouseenter',function(d){
                var tooltip = d3.select('.tooltip');
                tooltip
                    .transition()
                    .style('opacity',1)
                    .fill(function (d, i) {
                        var hue = colorScale(i);
                        return 'hsla(' + hue + ', 20%, 40%, 1.0)';
                    });

                tooltip.select('#Name').html(d.name);

            })
            .on('mousemove',function(){
                var xy = d3.mouse(svg.node());
                console.log(xy);

                var tooltip = d3.select('.tooltip');

                tooltip
                    .style('left',xy[0]+50+'px')
                    .style('top',(xy[1]+50)+'px');

            })
            .on('mouseleave',function(){
                var tooltip = d3.select('.tooltip')
                    .transition()
                    .style('opacity',0);
            })

        console.log(selection)
    }

    console.log([columnVariables[10]]);
    circles.exit().transition().remove();
};

// This jQuery function tells the browser to run the function
// `continuouslyLoadData` when the webpage is done loading.
// `continuouslyLoadData` is defined in spreadheet.js.
//  It will call our `drawGraph` function with new data every 5 seconds.
// See spreadsheet.js for the definition of `continuouslyLoadData`.
$(document).ready(function () {
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", drawGraph);
});