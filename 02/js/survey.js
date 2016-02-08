(function() {
  var data = [];
  var dimensions = [
    { key: "criticalcommunication", value: 'Communication'},
    { key: "criticalcommunication_2", value: "Communication 2"},
    { key: "graphicdesign", value: "Graphic Design"},
    { key: "graphicdesign_2", value: "Graphic Design 2"},
    { key: "howlongdidittakeyoutogethere", value: "Travel Time"},
    { key: "howmanyhoursperweekcanyoudevotetothisclass", value: "Hours devoted"},
    { key: "howmuchsleepdidyougetlastnight", value: "Sleep"},
    { key: "howtallareyou", value: "Height"},
    { key: "javascriptwebdevelopment", value: "Software"},
    { key: "javascriptwebdevelopment_2", value: "Software 2"},
    { key: "whenwasthelasttimeyoudrewapicture", value: "Drew"},
    { key: "whenwasthelasttimeyouwenttothebeach", value: "Beach"},
    { key: "whenwasthelasttimeyouwenttothemfa", value: "MFA"}
  ];

  xAxis = dimensions[0];
  yAxis = dimensions[1];

  var xLabel = function(svg, text) {
    var leftMargin = 20;
    var height     = 400;
    var width      = 600;

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 40)
        .attr("id", "x-label")
        .attr("dy", "1em")
        .attr("class", 'axis-label')
        .style("text-anchor", "middle")
        .text(text);
  };

  var yLabel = function(svg, text) {
    var leftMargin = 20;
    var height     = 400;
    svg.append("text")
        .attr("transform", "translate(0," + height / 2 + ") rotate(-90)")
        .attr("x", 0)
        .attr("y", 0)
        .attr("id", "y-label")
        .attr("dy", "1em")
        .attr("class", 'axis-label')
        .style("text-anchor", "middle")
        .text(text);
  };

  var drawSurvey = function(data) {
    var svg = d3.select("#survey");
    var radius = 100 / data.length;
    var width = 600 - radius;
    var height = 400 - radius;
    var leftMargin = 40;
    

    var xScale = d3.scale.ordinal()
      .domain(d3.range(data.length))
      .rangeRoundPoints([leftMargin, width]);

    var yScale = d3.scale.linear()
      .domain([0,10])
      .range([height,radius]);

    var colorScale = d3.scale.linear()
      .domain([0,data.length])
      .range([0,360]);

    var circles = svg.selectAll("circle")
      .data(data);

    circles
      .enter()
      .append("circle")
      .append("title")
      .text(function(d, i) { return "name:" + d.name});
    
    circles
      .attr('r', radius)
      .attr('fill', function(d,i) {
        var hue = colorScale(i);
        return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      })
      .attr("title", function(d,i){ 
        return d.name; 
      })
      .attr("cx", function(d,i){
        return xScale(i);
      })
      .attr("cy", function(d,i){
        return yScale(parseInt(d[yAxis.key]));
      });

    circles.exit().remove();
  };

  var setData = function(d) {
    data = d;
    drawSurvey(data);
  };

  var findDimension = function(key) {
    return _.find(dimensions,function(o) { return o.key === key; });
  };

  var setAxis = function(x,y){
    yAxis = findDimension(y) || yAxis;
    d3.select("#y-label").text(yAxis.value);
    drawSurvey(data);
  };

  var populateDropdown = function(selector, selectFun) {
    $(selector).empty();
    $(selector).off("change");
    _.map(dimensions, function(option) {
      var optionItem = '<option value="' + option.key + '">' + option.value + '</option>';
      $(selector).append(optionItem);
    });
    $(selector).on("change", selectFun);
  };

  $(document).ready(function() {
    yLabel(d3.select("#survey"), "y axis label");
    var doLoad = function() {
      loadSpreadsheet("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
    };
    setAxis(xAxis,yAxis);
    doLoad();
    var interval = 5000;
    setInterval(doLoad, interval);
    populateDropdown("#selectY", function(e) { setAxis(xAxis, this.value);  });
  });

})();
