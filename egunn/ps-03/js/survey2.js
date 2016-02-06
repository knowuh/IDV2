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

    /*
    console.log(columnToGraph);
  //had to move this outside of the draw function, because draw appends a new svg every cycle!  
  var addSVG = function(plot){
      svg = plot.append('svg')
      .attr('id','survey');
      
      return svg;
  }*/

  /***************************************************
   * instructions for drawing the Y axis label in D3 *
   ***************************************************/
  var drawYAxisLabel = function (svg, text) {
    var height = 400;
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
    
    
  /**************************************************
   * this is the function that updates the D3 graph *
   * @param data – the google spreadsheet data      *
   **************************************************/
  var drawGraph = function (data) {  
      
      //console.log(data[0]);
      
      /*nestedData = d3.nest()
        .key(function(d){return d.name})
        .entries(data);
      
      console.log(nestedData);*/
      
     var plot = d3.select("#plot"); 
/*
      //check to see if an svg element already exists. If not, make one.
     test = document.getElementById('survey');
      
     if (test==null){
        addSVG(plot); 
     }*/
     
    var margin = {t:25,r:40,b:25,l:40};
    var width = document.getElementById('plot').clientWidth - margin.r - margin.l,  
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;
      
    var radius     = 100 / data.length;
    //var width      = 600 - radius;
    //var height     = 400 - radius;
    //var leftMargin = 40;

    var xScale = d3.scale.ordinal()
      .domain(d3.range(data.length))
      .rangeRoundPoints([margin.l, width]);

    //console.log(document.getElementById('plot').clientWidth);
    var yScale = d3.scale.linear()
      .domain([10,1])
      .range([0,100]);

    var colorScale = d3.scale.linear()
      .domain([0, data.length])
      .range([0, 360]);
      
    var multiples = plot.selectAll('multiples')
      .data(data);
      
    var multipleWidth = (width/3)-15;
      
    multiples
        .enter()
        .append('div')
        .style('width',multipleWidth +'px')
        .attr('class','multiples')
        .append("svg")
        .style('width',multipleWidth +'px')
        .append('g');
      
    chartGroup = multiples.select('g')
        .append("rect")
        .attr('class','background')
        .style('pointer-events','all')
        .attr("x",20)
        .attr("y",20)
        .attr("width",multipleWidth-10)
        .attr("height",100)
        .attr("fill","none");
      
      var bars = multiples.select('g')
        .attr('transform','translate(0,30)')
        .append('g')
        .attr('class','bar-chart')
        .attr('transform','translate(25,-50)');
      
      var forBars = [data[0].criticalcommunication, data[0].criticalcommunication_2,data[0].graphicdesign, data[0].graphicdesign_2,data[0].howlongdidittakeyoutogethere,data[0].howmanyhoursperweekcanyoudevotetothisclass,data[0].howmuchsleepdidyougetlastnight,data[0].howmuchsleepdidyougetlastnight,data[0].howtallareyou,data[0].javascriptwebdevelopment,data[0].javascriptwebdevelopment_2,data[0].whenwasthelasttimeyoudrewapicture,data[0].whenwasthelasttimeyouwenttothebeach,data[0].whenwasthelasttimeyouwenttothemfa];
      
       console.log(data[0].name);
      
        //axis generator
        var axisX = d3.svg.axis()
            .orient('bottom')
            .tickSize(2)
            .scale(xScale);
            /*.ticks(d3.time.week)
            .tickFormat(d3.time.format('%Y-%m-%d'));*/
        var axisY = d3.svg.axis()
            .orient('left')
            .tickSize(3)
            .scale(yScale);
            //.tickSize(-width)
            //.ticks(forBars.length);

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
      multiples.select('g')
          .append('text')
          .text(data[0].name)
          .attr('class','namelabel')
          .attr('transform','translate('+multipleWidth/2+',-5)');
      
      //axisX.scale(xScale);
      //axisY.scale(yScale);

      var barWidth = ((multipleWidth-45)/forBars.length+1)-4;
      
      bars.selectAll('g')
        .data(forBars)
        .enter()
        .append("rect")
        .attr("x",function(d,i){return (i*(barWidth+4))})
        .attr("y",function(d,i){return 150-yScale(forBars[i])})
        .attr("width",barWidth)
        .attr("height",function(d,i){
            return yScale(forBars[i])})
        .style('fill', function (d, i) {
            var hue = colorScale(i);
            return 'hsla(' + hue + ', 20%, 40%, 1.0)';
        })
        .append("title")
        .text(function (d) {
        //console.log(d);
        return "name:" + d.name
      });
       


      //console.log(forBars);
   /* {key: "criticalcommunication", title: 'Communication'},
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
  ];*/
      
      
      
      
      /*
      //d.forEach(drawBarChart);
      barChart = bars.selectAll('bar')
        .data(function(d){console.log(d); return d.values})
        .enter()
        .append("rect")
        .attr("x",25)
        .attr("y",100)
        .attr("width",2)
        .attr("height",function(d){return (d.values);})
        .style("fill","red")
        .append("title")
        .text(function (d) {
            //console.log(d);
        return "name:" + d.name
      });
      */
    
      
   /* var bars = svg.selectAll("rect")
      .data(data);

    bars
      .enter()
      .append("rect")
      .append("title")
      .text(function (d) {
        return "name:" + d.name
      });

    bars
      //.attr('r', radius)
      .attr('fill',"blue")//function (d, i) {
        //var hue = colorScale(i);
        //return 'hsla(' + hue + ', 20%, 40%, 1.0)';
      //})
      .attr("title", function (d) {
        return d.name;
      })
      .attr("x", function (d, i) {
        return xScale(i);
      })
      .attr("width", function (d, i) {
        return 20;
      })
      .attr("y", function (d) {
        return yScale(parseInt(d[columnToGraph.key]));
      })
      .attr("height", function (d) {
        return height;
      });

    bars.exit().remove();*/
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
 /* var populateDropdown = function () {
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
*/
  // This jQuery function tells the browser to run the function
  // `continuouslyLoadData` when the webpage is done loading.
  // `continuouslyLoadData` is defined in spreadheet.js.
  //  It will call our `drawGraph` function with new data every 5 seconds.
  // See spreadsheet.js for the definition of `continuouslyLoadData`.
  $(document).ready(function () {
    //drawYAxisLabel(d3.select("#survey"), "y axis label");
    //setYAxis(columnToGraph);
    //populateDropdown();
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
  });
};

setupSurvey();