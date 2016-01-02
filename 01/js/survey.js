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

  var drawSurvey = function(data) {
    var svg = d3.select("#survey");
    var radius = 10;
    // var width = svg.attr('width');
    var width = 600 - radius;
    var height = 600 - radius;

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
    $('#xAxis').text(xAxis);
    $('#yAxis').text(yAxis);
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
    var doLoad = function() {
      loadSpreadsheet("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
    };
    setAxis(xAxis,yAxis);
    doLoad();
    var interval = 1000;
    setInterval(doLoad, interval);
    populateDropdown("#selectX", function(e) { setAxis(this.value,yAxis);  });
    populateDropdown("#selectY", function(e) { setAxis(xAxis, this.value); });
  });

})();
