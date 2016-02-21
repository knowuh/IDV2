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
  var width      = 600 - radius;
  var height     = 400 - radius;
  var leftMargin = 40;

  // A d3 ordinal scale is for discrete categories or names see: https://github.com/mbostock/d3/wiki/Ordinal-Scales
  var xScale = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundPoints([leftMargin, width]);

  // A linear Y axis scale, all our values range from 0-10
  var yScale = d3.scale.linear()
    .domain([0, 10])
    .range([height, radius]);

  var colorScale = d3.scale.linear()
    .domain([0, data.length])
    .range([0, 360]);

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
    .attr("cx", function (d, i) {
      return xScale(i);
    })
    .attr("cy", function (d) {
      // Use the array above e.g. d[columnVariables[0]] or d['keyname'];
      var columnData = parseInt(d["whenwasthelasttimeyoudrewapicture"]);
      return yScale(columnData);
    });

  circles.exit().remove();

console.log(data);

};

// This jQuery function tells the browser to run the function
// `continuouslyLoadData` when the webpage is done loading.
// `continuouslyLoadData` is defined in spreadheet.js.
//  It will call our `drawGraph` function with new data every 5 seconds.
// See spreadsheet.js for the definition of `continuouslyLoadData`.
$(document).ready(function () {
  continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", drawGraph);
});