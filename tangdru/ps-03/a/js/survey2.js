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
  var radius     = 180 / data.length;
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
    
  var labelHeight =394,
      lableIterations =35;

  var circles = svg.selectAll("circle").data(data),
      circles2 = svg.selectAll("circle2").data(data),
      circles3 = svg.selectAll("circle3").data(data),
      circles4 = svg.selectAll("circle4").data(data),
      circles5 = svg.selectAll("circle5").data(data),
      circles6 = svg.selectAll("circle6").data(data),
      circles7 = svg.selectAll("circle7").data(data),
      circles8 = svg.selectAll("circle8").data(data),
      circles9 = svg.selectAll("circle9").data(data),
      circles10 = svg.selectAll("circle10").data(data);   
    
   console.log(data);
    

  circles
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles
    .attr('r', (radius*.25))
    .attr('fill', "none")
    .attr("stroke-width", 1)                        
    .attr("stroke", function (d, i) {
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
      var columnData = parseInt(d["criticalcommunication"]);
      return yScale(columnData);
    });

  circles.exit().remove();
    
    
  circles2
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles2
    .attr('r', radius*.5)
    .attr('fill', "none")
    .attr("stroke-width", 1)                        
    .attr("stroke", function (d, i) {
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
    .attr('r', radius*.75)
    .attr('fill', "none")
    .attr("stroke-width", 1)                        
    .attr("stroke", function (d, i) {
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
    .attr('fill', "none")
    .attr("stroke-width", 1)                        
    .attr("stroke", function (d, i) {
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
    .attr('r', radius*1.25)
    .attr('fill', "none")
    .attr("stroke-width", 1)                        
    .attr("stroke", function (d, i) {
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
    .attr('r', radius*1.5)
    .attr('fill', "none")
    .attr("stroke-width", 1)                        
    .attr("stroke", function (d, i) {
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
    .attr('r', radius*1.75)
    .attr('fill', "none")
    .attr("stroke-width", 1)                        
    .attr("stroke", function (d, i) {
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
    .attr('r', radius*2)
    .attr('fill', "none")
    .attr("stroke-width", 1)                        
    .attr("stroke", function (d, i) {
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

  circles8.exit().remove();    
    
  circles9
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles9
    .attr('r', radius*2.25)
    .attr('fill', "none")
    .attr("stroke-width", 1)                        
    .attr("stroke", function (d, i) {
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
      var columnData = parseInt(d["whenwasthelasttimeyouwenttothebeach"]);
      return yScale(columnData);
    }); 
      
    circles9.exit().remove();   
    
    
  circles10
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d.name
    });

  circles10
    .attr('r', radius*2.5)
    .attr('fill', "none")
    .attr("stroke-width", 1)                        
    .attr("stroke", function (d, i) {
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
      var columnData = parseInt(d["whenwasthelasttimeyouwenttothemfa"]);
      return yScale(columnData);
    });

  circles10.exit().remove();    
    
   svg.append("text")
      .attr("transform", "translate(25,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .attr('fill', function (d, i) {
      var hue = colorScale(0);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      })
      .text("cara");  
    
   svg.append("text")
      .attr("transform", "translate(70,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .attr('fill', function (d, i) {
      var hue = colorScale(1);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      })
      .text("kini"); 
    
  svg.append("text")
      .attr("transform", "translate(115,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("erica")
      .attr('fill', function (d, i) {
      var hue = colorScale(2);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });
    
  svg.append("text")
      .attr("transform", "translate(155,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("lia")
      .attr('fill', function (d, i) {
      var hue = colorScale(3);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });
    
   svg.append("text")
      .attr("transform", "translate(195,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("jessie")
      .attr('fill', function (d, i) {
      var hue = colorScale(4);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });
    
   svg.append("text")
      .attr("transform", "translate(238,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("andrew")
      .attr('fill', function (d, i) {
      var hue = colorScale(5);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });
 
  svg.append("text")
      .attr("transform", "translate(280,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("janny")
      .attr('fill', function (d, i) {
      var hue = colorScale(6);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });

    
   svg.append("text")
      .attr("transform", "translate(320,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("lorenzo")
      .attr('fill', function (d, i) {
      var hue = colorScale(7);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });
 
  svg.append("text")
      .attr("transform", "translate(362,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("lucy")
      .attr('fill', function (d, i) {
      var hue = colorScale(8);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });
    
   svg.append("text")
      .attr("transform", "translate(405,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("navi")
      .attr('fill', function (d, i) {
      var hue = colorScale(9);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });
    
   svg.append("text")
      .attr("transform", "translate(448,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("xinhe")
      .attr('fill', function (d, i) {
      var hue = colorScale(10);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });
    
   svg.append("text")
      .attr("transform", "translate(490,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("sever")
      .attr('fill', function (d, i) {
      var hue = colorScale(11);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });

   svg.append("text")
      .attr("transform", "translate(532,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("patrick")
      .attr('fill', function (d, i) {
      var hue = colorScale(12);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });
    
   svg.append("text")
      .attr("transform", "translate(575,394) rotate(-90)")
      .attr("dy", "1em")
      .attr("class", 'axis-label')
      .text("ryan")
      .attr('fill', function (d, i) {
      var hue = colorScale(13);
      return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      });




};

// This jQuery function tells the browser to run the function
// `continuouslyLoadData` when the webpage is done loading.
// `continuouslyLoadData` is defined in spreadheet.js.
//  It will call our `drawGraph` function with new data every 5 seconds.
// See spreadsheet.js for the definition of `continuouslyLoadData`.
$(document).ready(function () {
  continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", drawGraph);
});