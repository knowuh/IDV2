//function that pulls in the survey data and stores it in arrays for future access.
var setupSurvey =function() {
  var spreadsheetData = [];

  //make an array called column variables full of objects, each of which has a key and a title.     
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

  //Store all of the keys in an array called columnToGraph (to be used in the dropdown menu)    
  var columnToGraph = columnVariables[1];

  //console.log(columnVariables[4]);

  /***************************************************
   * instructions for drawing the Y axis label in D3 *
   ***************************************************/
  
  var drawYAxisLabel = function (svg, text) {
      //set the desired height of the axis
    var height = 400;
      //add a text item to the svg canvas
    svg.append("text")
      //move it to half of the axis height, and rotate it to be vertically aligned
      .attr("transform", "translate(0," + height / 2 + ") rotate(-90)")
    //set its x and y position
      .attr("x", 0)
      .attr("y", 0)
    //call it y-label
      .attr("id", "y-label")
    //set the size of the box
      .attr("dy", "1em")
    //tell the webpage that this is an axis-label (for CSS styling)
      .attr("class", 'axis-label')
    //center the text
      .style("text-anchor", "middle")
      .text(text);
  };

  /**************************************************
   * this is the function that updates the D3 graph *
   * @param data – the google spreadsheet data      *
   **************************************************/
//make a function to draw the graph on the webpage  
var drawGraph = function (data) {
    //set up some variables
    var svg        = d3.select("#survey");
    var radius     = 100 / data.length;
    var width      = 600 - radius;
    var height     = 400 - radius;
    var leftMargin = 40;

    //scale the data x values to fit on the axis. Use an ordinal scale, going from 0 to the datalength (number of items in the array)
    var xScale = d3.scale.ordinal()
      .domain(d3.range(data.length))
      .rangeRoundPoints([leftMargin, width]);

    //scale the y values to fit on the axis. Use a linear scale, so that the data values between 0 and 10 are mapped onto an axis that is the height of the screen. Use radius to limit dimensions so that circles don't get cut off at the bottom of the scale  
    var yScale = d3.scale.linear()
      .domain([0, 10])
      .range([height, radius]);
 
    //create a color scale to vary from 0 to 360 across the length of the data. 
    var colorScale = d3.scale.linear()
      .domain([0, data.length])
      .range([0, 360]);

    //add a scale to adjust circle size. For values between 0,300, scale to a radius size of 0,50. Use sqrt scale to scale by area rather than linearly by radius
    var areaScale = d3.scale.sqrt().domain([0,300]).range([0,50]);
      
    //save all circle objects in the DOM in a variable for future use  
    var circles = svg.selectAll("circle")
      //bind the circle objects to the data to represent
      .data(data);

    //take the circle selection  
    circles 
      //create new DOM element for each piece of bound data (if array is 10 elements long, makes 10 new items in the DOM) 
      .enter()
      //draw a circle for each piece of bound data
      .append("circle")
      //add a title to each one (added to DOM element - see in the elements inspector);
      .append("title")
      .style("stroke","black")
      //should add a text label - doesn't seem to be working? Showing up in DOM, but no text is printing to screen
      .text(function (d) {
        return "name:" + d.name
      });

    //set the display parameters for each circle above  
    circles
      //give it a radius, based on the value of the TravelTime column (I added this to make sure that I could access the data) 
      .attr('r', function(d,i){
        return areaScale(parseInt(d[columnVariables[4].key]));
                              })
      //give it a fill color based on the colorScale saved above
      .attr('fill', function (d, i) {
        var hue = colorScale(i);
        return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      })
      //give it a title (still not showing up)
      .attr("title", function (d) {
        return d.name;
      })
      //give it an x location
      .attr("cx", function (d, i) {
        return xScale(i);
      })
      //and a y position
      .attr("cy", function (d) {
        return yScale(parseInt(d[columnToGraph.key]));
      });

    //remove anything that isn't connected to the current dataset (used when the screen updates between user interactions - cleans up anything "extra" from one dataset to the next)  
    circles.exit().remove();
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
  //look up the data associated with a particular key variable in the spreadsheet (when I ask for Communication data, give me things from the right column)
  var findDataForKey = function (key) {
    return _.find(columnVariables, function (o) {
      return o.key === key;
    });
  };

  /*****************************************************************************
   * function that sets the Y axis on our graph to a given columnKey           *
   *****************************************************************************/
  //name the y axis using the data from the spreadsheet - find the data, then write a text element to the y-label DOM element, and call the drawGraph function, handing it the spreadsheet data    
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
      //call Y axis label function to update label
    drawYAxisLabel(d3.select("#survey"), "y axis label");
      //Save the right data in the columnToGraph variable for graphing
    setYAxis(columnToGraph);
      //make an updated list for the dropdown menu and fill it with values
    populateDropdown();
      //load the data from the spreadsheet (calling the spreadsheet function saved in the parent directory)
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
  });
};

setupSurvey();
