var setupSurvey =function() {
  var spreadsheetData = [];
  var columnVariables = [
    {key: "criticalcommunication", title: 'Communication'},
    {key: "criticalcommunication_2", title: "Communication 2"},
    {key: "graphicdesign", title: "Graphic Design"},
    {key: "graphicdesign_2", title: "Graphic Design 2"},
    {key: "howlongdidittakeyoutogethere", title: "Travel Time"},
    {key: "howmanyhoursperweekcanyoudevotetothisclass", title: "Hours devoted"},
    {key: "howmuchsleepdidyougetlastnight", title: "Sleep"},
    {key: "howtallareyou", title: "Height"},
    {key: "javascriptwebdevelopment", title: "Software"},
    {key: "javascriptwebdevelopment_2", title: "Software 2"},
    {key: "whenwasthelasttimeyoudrewapicture", title: "Drew"},
    {key: "whenwasthelasttimeyouwenttothebeach", title: "Beach"},
    {key: "whenwasthelasttimeyouwenttothemfa", title: "MFA"}
  ];

  var columnToGraph = columnVariables[1];


  /***************************************************
   * instructions for drawing the Y axis label in D3 *
   ***************************************************/
  var drawYAxisLabel = function (svg, text) {
    var height = 400;
    svg.append("text")
//        .attr("transform", "translate(0," + height/2 + ") rotate(-90)")
        .attr("x", 0)
        .attr("y", 0)
        .attr("id", "y-label")
        .attr("dy", "2em")
        .attr("class", 'axis-label')
        .style("text-anchor", "right")
        .text(text);
  };

  /**************************************************
   * this is the function that updates the D3 graph *
   * @param data – the google spreadsheet data      *
   **************************************************/
  var drawGraph = function (data) {
    var svg        = d3.select("#survey").append('g');
    var radius     = 100 / data.length;
    var width      = 600 - radius;
    var height     = 400 - radius;
    var leftMargin = 40;
     
//Scales are functions that map from an input domain to an output range. 
//Ordinal scales have a discrete domain, such as a set of names or categories. 
    var xScale = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundPoints([leftMargin, width]);

    var yScale = d3.scale.linear()
        .domain([0, 10])
        .range([height, radius]);
      
    var rScale = d3.scale.linear()
        .domain([0, 10])
        .range([0, 25]);
      
    var colorScale = d3.scale.linear()
        .domain([0, data.length])
        .range([0, 360]);
      
       console.log(data)
       
     var circles = svg.selectAll(".Circle")
        .data(data) 
     
     var circlesEnter=circles.enter().append('g')
        .attr('class','Circle')
        .attr('transform',function(d,i){return "translate("+i*width/data.length+20+","+height/2+")"})
        .style('opacity',0)
     circlesEnter
        .append('circle')
        .attr('r',function(d){ return rScale(parseInt(d[columnToGraph.key]))})
        .style('fill',function(d,i){
            var hue= colorScale(i);
            return 'hsla('+hue+',80%,40%,0.8)';})
     
     circlesEnter
        .append('text')
        .attr('class','Text')
        .text(function (d) {  return d.name; })
        .attr('text-anchor','middle')
        .attr('font-size',3 )
//        .on('click',function(d){
//              d3.select(this).select('Text')
//            .style('fill','rgb(200,200,200)')})
           
    var circlesExit=circles.exit()
        .transition()
        .attr('transform',function(d,i){return "translate("+i*width/data.length+20+","+height/2+")"})
        .style('opacity',0)
    
     circlesExit.remove()//doesn't work,,,
    
    var circlesUpdate=circles.transition().duration(300)
    circlesUpdate
        .attr('transform',function(d,i){return "translate("+i*width/data.length+20+","+height/2+")"})
        .style('opacity',1)
    circlesUpdate.select("Circle")
        .attr('r',function(d){ return rScale(parseInt(d[columnToGraph.key]))})
    circlesUpdate.select('Text')
         .attr('font-size',10)
        .style('fill','rgb(100,80,80)')
  };

  /*****************************************************************************
   * function is called with d when the spreadsheet has loaded.                *
   *****************************************************************************/
  var setData = function (sheet) {
    spreadsheetData = sheet;
    drawGraph(spreadsheetData);
  };

  /*****************************************************************************
   * function returns an array of data for a specific column in the spreadsheet *
   *****************************************************************************/
  var findDataForKey = function (key) {
    return _.find(columnVariables, function (o) {
      return o.key === key;
    });
  };

  /*****************************************************************************
   * function that sets the Y axis on our graph to a given columnKey           *
   *****************************************************************************/
  var setYAxis = function (columnKey) {
    columnToGraph = findDataForKey(columnKey) || columnToGraph;
    d3.select("#y-label").text(columnToGraph.title);
    drawGraph(spreadsheetData);
  };

  /*****************************************************************************
   * function that puts our column names in the dropdown menu using jQuery ($) *
   *****************************************************************************/
  var populateDropdown = function () {
    var selectionChangedFunction = function() {
      setYAxis(this.value);
    };
    var selector = "#selectY";
    $(selector).empty();
    $(selector).off("change");
    _.map(columnVariables, function (option) {
      var optionItem = '<option value="' + option.key + '">' + option.title + '</option>';
      $("#selectY").append(optionItem);
    });
    $(selector).on("change", selectionChangedFunction);
  };

  // This jQuery function tells the browser to run the function
  // `continuouslyLoadData` when the webpage is done loading.
  // `continuouslyLoadData` is defined in spreadheet.js.
  //  It will call our `drawGraph` function with new data every 5 seconds.
  // See spreadsheet.js for the definition of `continuouslyLoadData`.
  $(document).ready(function () {
    drawYAxisLabel(d3.select("#survey"), "y axis label");
    setYAxis(columnToGraph);
    populateDropdown();
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
  });
};

setupSurvey();
