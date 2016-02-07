/* Sorry for the ugly code. Was trying to follow these examples:

https://flowingdata.com/2014/10/15/linked-small-multiples/
http://bl.ocks.org/officeofjane/7315455

but code setup and data structure were very different. I tried
implementing nested data, but couldn't get the right combination of 
nesting keys to allow me to plot the bar charts the "right" way.
So, I did what I could to make it work. Not pretty...*/

//function called by the continuouslyLoadData function when the GoogleSheets data is loaded
var setupSurvey =function() {
    
  //function to draw (and theoretically, update) the data plots      
  var drawGraph = function (data) {  

  //look to see if bar charts have already been drawn. If so, do nothing. 
  //(This was necessary because the callback kept appending new plots every time the data reloaded)      
  checkIfPopulated = d3.selectAll('.bar-chart'); 
      
  if (checkIfPopulated[0].length!=0){
      /*there should be an update function here, to repopulate the charts if the data has changed. Was  
      unable to get update() to work - kept getting an error that it wasn't a function.*/
  }
    
  //If nothing has been drawn, then draw the data plots      
  else{
      //select the HTML plot element by id 
      var plot = d3.select("#plot"); 
      
      //set some margins and record width and height of window
      var margin = {t:25,r:40,b:25,l:40};
      var width = document.getElementById('plot').clientWidth - margin.r - margin.l,  
      height = document.getElementById('plot').clientHeight - margin.t - margin.b;

      //set up scales for plotting the data
      var xScale = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundPoints([margin.l, width]);

      var yScale = d3.scale.linear()
        .domain([10,1])
        .range([0,100]);

      var colorScale = d3.scale.linear()
        .domain([0, data.length])
        .range([0, 360]);
      
      //calculate the width for the small multiples windows
      var multipleWidth = (width/3)-15;
      
      //add a new div element to hold all of the small multiples (used a div to center it via CSS)
      multiplesBox = plot.append('div')
        .attr('class','multiplesBox');
      
      //make an empty selection, bind to the data
      var multiples = multiplesBox.selectAll('multiples')
        .data(data);

      //append an svg and group to each one
      multiples
        .enter()
        .append('div')
        .style('width',multipleWidth +'px')
        .attr('class','multiples')
        .append("svg")
        .style('width',multipleWidth +'px')
        .append('g');
      
 
      //select each group in multiples, and append a rectangle to it (this was going to be used for
      //mouse event detection, but debugging the rest of the code took too long to implement that feature)
      chartGroup = multiples.select('g')
        .append("rect")
        .attr('class','background')
        .style('pointer-events','all')
        .attr("x",20)
        .attr("y",20)
        .attr("width",multipleWidth-10)
        .attr("height",100)
        .attr("fill","none");
      
      //Append a group to hold the bar charts within each multiples plot
      var bars = multiples.select('g')
        .attr('transform','translate(0,30)')
        .append('g')
        .attr('class','bar-chart')
        .attr('transform','translate(25,-50)');
      
      //create a data subset for each bar chart (should be able to do this with nested data instead)
      var forBars = function(multipleIndex) { 
          return [data[multipleIndex].criticalcommunication,            
                 data[multipleIndex].criticalcommunication_2,
                 data[multipleIndex].graphicdesign,
                 data[multipleIndex].graphicdesign_2,
                 data[multipleIndex].howlongdidittakeyoutogethere,
                 data[multipleIndex].howmanyhoursperweekcanyoudevotetothisclass,
                 data[multipleIndex].howmuchsleepdidyougetlastnight,
                 data[multipleIndex].howmuchsleepdidyougetlastnight,
                 data[multipleIndex].howtallareyou,
                 data[multipleIndex].javascriptwebdevelopment,
                 data[multipleIndex].javascriptwebdevelopment_2,
                 data[multipleIndex].whenwasthelasttimeyoudrewapicture,
                 data[multipleIndex].whenwasthelasttimeyouwenttothebeach,
                 data[multipleIndex].whenwasthelasttimeyouwenttothemfa];
        }
    
        //x and y axis generator functions
        var axisX = d3.svg.axis()
            .orient('bottom')
            .tickSize(2)
            .scale(xScale);
        var axisY = d3.svg.axis()
            .orient('left')
            .tickSize(2)
            .scale(yScale);

        //add each axis to the multiples group
        multiples.select('g')
            .append('g')
            .attr('class','axis axis-x')
            .attr('transform','translate(-20,100)')
            .call(axisX);
        multiples.select('g')
            .append('g')
            .attr('class','axis axis-y')
            .attr('transform','translate(20,0)')
            .call(axisY);
        
        //add a text label to each plot
        multiples.select('g')
            .append('text')
            .text(function(d,i){return (data[i].name)})
            .attr('class','namelabel')
            .attr('transform','translate(20,-8)');
      
        //create a dummy variable from the data to calculate the right width for the bars
        forBarsDummy = forBars(1);
        var barWidth = ((multipleWidth-45)/forBarsDummy.length+1)-4;
      
        //bind the data from the forBars array to the groups, then populate them with rectangles 
        //based on data values, with appropriate scaling applied
        bars.selectAll('g')
            .data(function(d,i){return forBars(i);})
            .enter()
            .append("rect")
            .attr("class","bars")
            .attr("x",function(d,i){return (i*(barWidth+4))})
            .attr("y",function(d,i){return 150-yScale(d)})
            .attr("width",barWidth)
            .attr("height",function(d,i){
                return yScale(d)})
            .style('fill', function (d, i) {
                hue = colorScale(i);
                return 'hsla(' + hue + ', 20%, 40%, 1.0)';
            });
       
        }
      
  };

  /*****************************************************************************
   * function is called with d when the spreadsheet has loaded.                *
   *****************************************************************************/
  var setData = function (sheet) {
    spreadsheetData = sheet;
    drawGraph(spreadsheetData);
  };

  // This jQuery function tells the browser to run the function
  // `continuouslyLoadData` when the webpage is done loading.
  // `continuouslyLoadData` is defined in spreadheet.js.
  //  It will call our `drawGraph` function with new data every 5 seconds.
  // See spreadsheet.js for the definition of `continuouslyLoadData`.
  $(document).ready(function () {
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
  });
};

setupSurvey();