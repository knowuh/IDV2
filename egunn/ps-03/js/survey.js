//My modified code 

//*********************************************************************** Overall summary
//*********************************************************************
/*document ready function loads data from Google every 5 s, and calls the setData callback, which calls the drawGraph function and passes it the data as an array of objects. Each object corresponds to one student in the class, and each one has a set of several keys, which are listed in the columnVariables array below. 

Individual data points can be accessed by using:
console.log(data[0][columnVariables[2].key]);
Where 0 is the object # (student), and [2] corresponds to the third key value stored in the object (the example above returns 4). When the data is bound, d[columnVariables[2].key] can be used to access the data, as in line 107 below
*/

//function that pulls in the survey data and stores it in arrays for future access.
var setupSurvey =function() {
  var spreadsheetData = [];

  //make an array called column variables full of objects, each of which has a key and a title.     
  var columnVariables = [
    {key: "criticalcommunication", title: 'Communication'},
    {key: "criticalcommunication_2", title: "Communication_2"},
    {key: "graphicdesign", title: "Graphic_Design"},
    {key: "graphicdesign_2", title: "Graphic_Design_2"},
    {key: "howlongdidittakeyoutogethere", title: "Travel_Time"},
    {key: "howmanyhoursperweekcanyoudevotetothisclass", title: "Hours_devoted"},
    {key: "howmuchsleepdidyougetlastnight", title: "Sleep"},
    {key: "howtallareyou", title: "Height"},
    {key: "javascriptwebdevelopment", title: "Software"},
    {key: "javascriptwebdevelopment_2", title: "Software_2"},
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
    /*Because the data is updated constantly by the populateDropdown function, and because we have to wait  
    until it is fully loaded and the callback function completes, any variable that needs to use the data 
    for any reason has to exist inside this function.*/
    
    //clear the screen before drawing anything (necessary b/c of auto-updating function)
    temp3 = d3.selectAll(".textLabel")
    temp3.remove();

    //set up some variables needed later, including selection containing the svg canvas
    var svg = d3.select("#survey");
    var radius     = 100 / data.length;
    var width      = 600 - radius;
    var height     = 400 - radius;
    var leftMargin = 140;
   
    //set up data scales for plotting data
    var xScale = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundPoints([leftMargin, width]);
    var yScale = d3.scale.linear()
        .domain([0, 10])
        .range([height, radius+25]);
    var colorScale = d3.scale.linear()
        .domain([0, data.length])
        .range([0, 360]);
    var areaScale = d3.scale.sqrt().domain([0,300]).range([0,50]);
    
    //create an empty selection and bind the data to it
    var circles = svg.selectAll("circle")
        .data(data);

    //draw the circles
    circles 
      .enter()
      .append("circle")
      .append("title")
      .text(function (d) {
        return "name:" + d.name
      });
    
    //go through and plot each of the datasets in the series
    for (i=0;i<columnVariables.length;i++){   
        
        //set the color based on where we are in the series
        var hue = i*50;
    
        //set up a line and area generator to draw line plots and area fills using the scaled data
        lineGenerator = d3.svg.line() 
            .x(function(d,i){return xScale(i)}) 
            .y(function(d){return yScale(d[columnVariables[i].key])});
        
        areaGenerator = d3.svg.area()       
            .x(function(d,i){return xScale(i)})
            .y0(height)
            .y1(function(d){return yScale(d[columnVariables[i].key])})
            .interpolate('linear');  

        //draw a set of circles to represent the data points. 
        //Currently, these are not showing up as bound to the data, and are eliminated 
        //when the exit function is left on.
        circles
          .enter()
          .append("circle")
          .attr('r', 1)
          .attr('fill', 'hsla(' + hue + ', 20%, 50%, 1.0)')
          .attr("title", function (d) {
            return d.name;
          })
          .attr("cx", function (d, i) {
            return xScale(i);
          })
          .attr("cy", function (d) {
            return yScale(parseInt(d[columnVariables[i].key]));
          });

        //draw the line connecting the points by calling the lineGenerator function
        line = svg
          .append('path')
          .attr('class',"line")
          .datum(data)    
          .style('stroke','hsla(' + hue + ', 60%, 80%, .8)')
          .style('fill',"none")
          .attr('d',function(array){return lineGenerator(array)});

        //plot the fill area as well  
        var area = svg.append('path')
            .attr('class',"area "+ columnVariables[i].title)
            .datum(data)
            .style('fill','hsla(' + hue + ', 80%, 50%, 0.1)')
            .attr('d',function(array){return areaGenerator(array)});

        //add labels for each data series, colored to match. Record mouse events for these labels.
        var textIndex = svg.append('text')
            .attr('class','textLabel '+columnVariables[i].title)
            .attr('x',5)
            .attr('y',20+i*30)
            .style('fill','hsla(' + hue + ', 80%, 50%, .8)')
            .text(columnVariables[i].title)
            .on("mouseover",mouseHighlight)
            .on("mouseout",noMouseHighlight);
    }
   
};
    
var colorCut = [];
    
//this functionality based in part on http://bl.ocks.org/WilliamQLiu/76ae20060e19bf42d774  
//This is definitely not the cleanest way to write this section, but I was having difficulty getting 
//the color data out of each element in order to update with mouseevents. I tried passing the 
//hue value in with the function, among other things, but that caused problems with the focus.
//Currently, this is painfully slow, because the color doesn't actually update until the next time
//that the data is loaded and the screen refreshes.
function mouseHighlight(d){
    //grab the current selection from the function input
    categoryName = d3.select(this);
    
    //dig the color value out of its object tree and save it
    originalColor = categoryName[0][0].attributes[3].nodeValue;
    colorCut = originalColor.substring(5,originalColor.length-1);
    colorCut2 = colorCut.substring(0,colorCut.length-4);

    //find the appropriate name for the object that was passed in (apparently can't get the bound data
    //directly, because outside of the function where the bind happened)
    selectionName = d3.select('.'+[categoryName[0][0].innerHTML]);
    
    //and set its alpha value
    selectionName
        .style('fill',colorCut2+'0.9)');
}
     
function noMouseHighlight(d) {
    categoryName = d3.select(this);
    
    //reset alpha value and fill color to the original values stored above
    selectionName = d3.select('.'+[categoryName[0][0].innerHTML])
        .style('fill',colorCut);
}

  /*****************************************************************************
   * function is called with d when the spreadsheet has loaded.                *   *****************************************************************************/
    
  var setData = function (sheet) {
    spreadsheetData = sheet;
    //console.log(spreadsheetData);
    temp = d3.selectAll(".line");
    temp.remove();
    temp2 = d3.selectAll(".area")
    temp2.remove();
    drawGraph(spreadsheetData);
    //temp3 = d3.selectAll(".textLabel")
    //temp3.remove();
      
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

  // This jQuery function tells the browser to run the function
  // `continuouslyLoadData` when the webpage is done loading.
  // `continuouslyLoadData` is defined in spreadheet.js.
  //  It will call our `drawGraph` function with new data every 5 seconds.
  // See spreadsheet.js for the definition of `continuouslyLoadData`.
  $(document).ready(function () {
      //load the data from the spreadsheet (calling the spreadsheet function saved in the parent directory)
      continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
  });
  
  
};

setupSurvey();
