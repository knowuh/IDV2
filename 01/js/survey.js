(function() {
  var data = [];
  var axisOptions = [
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
    "whatdoyouwanttogetoutofthisclass",
    "whenwasthelasttimeyoudrewapicture",
    "whenwasthelasttimeyouwenttothebeach",
    "whenwasthelasttimeyouwenttothemfa"
  ];

  xAxis = axisOptions[0];
  yAxis = axisOptions[1];

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
    var radius = 10;
    var width = 600 - radius;
    var height = 400 - radius;

    var xScale = d3.scale.linear()
      .domain([0,10])
      .range([radius,width]);

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
      .append("circle");

    circles
      .attr('r', radius)
      .attr('fill', function(d,i) {
        var hue = colorScale(i);
        return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      })
      .attr("cx", function(d,i){
        return xScale(parseInt(d[xAxis]));
      })
      .attr("cy", function(d,i){
        return yScale(parseInt(d[yAxis]));
      });

    circles.exit().remove();
  };

  var setData = function(d) {
    data = d;
    drawSurvey(data);
  };

  var setAxis = function(x,y){
    xAxis = x || xAxis;
    yAxis = y || yAxis;
    d3.select("#y-label").text(yAxis);
    d3.select("#x-label").text(xAxis);
    drawSurvey(data);
  };

  var populateDropdown = function(selector, selectFun) {
    $(selector).empty();
    $(selector).off("change");
    _.map(axisOptions, function(option) {
      var optionItem = '<option value="' + option + '">' + option + '</option>';
      $(selector).append(optionItem);
    });
    $(selector).on("change", selectFun);
  };

  $(document).ready(function() {
    yLabel(d3.select("#survey"), "woo");
    xLabel(d3.select("#survey"), "boo");
    var doLoad = function() {
      loadSpreadsheet("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
    };
    setAxis(xAxis,yAxis);
    doLoad();
    var interval = 5000;
    setInterval(doLoad, interval);
    populateDropdown("#selectX", function(e) { setAxis(this.value,yAxis);  });
    populateDropdown("#selectY", function(e) { setAxis(xAxis, this.value); });
  });

})();
