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
  var svg        = d3.select("#survey"),
      svg2       = d3.select("#survey2"),
      svg3       = d3.select("#survey3"),
      svg4       = d3.select("#survey4"),
      svg5       = d3.select("#survey5"),
      svg6       = d3.select("#survey6"),
      svg7       = d3.select("#survey7"),
      svg8       = d3.select("#survey8"),
      svg9       = d3.select("#survey9"),
      svg10       = d3.select("#survey10");
    
    
  var radius     = 50 / data.length;
  var width      = 200 - radius;
  var height     = 180 - radius;
  var leftMargin = 10;

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
    
  var circles = svg.selectAll("circles").data(data),
      circles2 = svg2.selectAll("circles2").data(data),
      circles3 = svg3.selectAll("circles3").data(data),
      circles4 = svg4.selectAll("circles4").data(data),
      circles5 = svg5.selectAll("circles5").data(data),
      circles6 = svg6.selectAll("circles6").data(data),
      circles7 = svg7.selectAll("circles7").data(data),
      circles8 = svg8.selectAll("circles8").data(data),
      circles9 = svg9.selectAll("circles9").data(data),
      circles10 = svg10.selectAll("circles10").data(data);
    
   console.log(data);
  
    
//nesting by name, not sure how to map by this. 
  var nestedData1 = d3.nest()
        .key(function (d) {
            return d.name
        })
        .entries(data);

    console.log(nestedData1);
    
    
//  var lineGenerator = d3.svg.line()
//        .x(function(d){ return xScale(i)})
//        .y(function(d){ return scaleY(d.value)})
//        .interpolate('monotone');
    
    var lineGenerator = d3.svg.line()
        .x(function (d, i) {return xScale(i);})
        .y(function (d) {var columnData = parseInt(d[0]);
      return yScale(columnData);
    })
        .interpolate('monotone');
    
     

  circles
//    .data(nestedData1)
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
      var columnData = parseInt(d["criticalcommunication"]);
      return yScale(columnData);
    });
    
//    .attr("cy", function(d){return yScale(d[columnVariables[i].key])})
//    });

   circles.exit().remove();
    
    
        
  circles2
    .enter()
//    .append('line')
//    .attr('d', lineGenerator)
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles2
    .attr('r', radius)
  //  .attr('stroke-width', '2px')
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
      var columnData = parseInt(d["graphicdesign"]);
      return yScale(columnData);
    });

   circles2.exit().remove();
    
 circles3
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles3
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
      var columnData = parseInt(d["howlongdidittakeyoutogethere"]);
      return yScale(columnData);
    });

   circles3.exit().remove();
    
  circles4
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles4
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
      var columnData = parseInt(d["howmanyhoursperweekcanyoudevotetothisclass"]);
      return yScale(columnData);
    });

   circles4.exit().remove();
    
  circles5
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles5
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
      var columnData = parseInt(d["howmuchsleepdidyougetlastnight"]);
      return yScale(columnData);
    });

   circles5.exit().remove();
    
  circles6
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles6
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
      var columnData = parseInt(d["howtallareyou"]);
      return yScale(columnData);
    });

   circles6.exit().remove();
    
  circles7
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles7
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
      var columnData = parseInt(d["javascriptwebdevelopment"]);
      return yScale(columnData);
    });

   circles7.exit().remove();
    
  circles8
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles8
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
      var columnData = parseInt(d["whenwasthelasttimeyoudrewapicture"]);
      return yScale(columnData);
    });

   circles8.exit().remove();

    
   circles9
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles9
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
      var columnData = parseInt(d["whenwasthelasttimeyouwenttothebeach"]);
      return yScale(columnData);
    });

   circles9.exit().remove();



};






// This jQuery function tells the browser to run the function
// `continuouslyLoadData` when the webpage is done loading.
// `continuouslyLoadData` is defined in spreadheet.js.
//  It will call our `drawGraph` function with new data every 5 seconds.
// See spreadsheet.js for the definition of `continuouslyLoadData`.
$(document).ready(function () {
  continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", drawGraph);
});