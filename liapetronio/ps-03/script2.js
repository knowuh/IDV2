var setupSurvey =function() {
  var spreadsheetData = [];
  var columnVariables = [
    {col: "criticalcommunication", title: 'Communication'},
    {col: "criticalcommunication_2", title: "Communication 2"},
    {col: "graphicdesign", title: "Graphic Design"},
    {col: "graphicdesign_2", title: "Graphic Design 2"},
    {col: "howlongdidittakeyoutogethere", title: "Travel Time"},
    {col: "howmanyhoursperweekcanyoudevotetothisclass", title: "Hours devoted"},
    {col: "howmuchsleepdidyougetlastnight", title: "Sleep"},
    {col: "howtallareyou", title: "Height"},
    {col: "javascriptwebdevelopment", title: "Software"},
    {col: "javascriptwebdevelopment_2", title: "Software 2"},
    {col: "whenwasthelasttimeyoudrewapicture", title: "Drew"},
    {col: "whenwasthelasttimeyouwenttothebeach", title: "Beach"},
    {col: "whenwasthelasttimeyouwenttothemfa", title: "MFA"}
  ];

var columnToGraph = columnVariables[0]; //to select which column

  var drawGraph = function (data) {
	var m = {t:10,r:10,b:10,l:60},
	    w = $('#survey2').width() - m.l - m.r,
	    h = $('#survey2').height() - m.t - m.b;

	var svg = d3.select('#survey2')
	  .append('svg')
	  .attr('width', w + m.l + m.r)
	  .attr('height', h + m.t + m.b)
	  .append('g')
	  .attr('transform','translate('+ m.l + ',' + m.t + ')');

	// Set the sankey diagram properties
	var sankey = d3.sankey()
	    .nodeWidth(2)
	    .nodePadding(10)
	    .size([w, h]);
	 
	var path = sankey.link();
console.log("data", data);

	var nestedNodes = d3.nest()
	    .key(function (d){return d.name; }) //the column we are searching through
	    .entries(data)
	    
	    var sum_total=0;

	    nestedNodes.forEach(function(data){
	            total = data.values.length
	            data.total = total
	            sum_total += data.total
	        })

	var node_data = nestedNodes
	        .sort(function(a, b){
	        return d3.descending(a.total, b.total)})


	node_data = nestedNodes.map(function (d){
	    return {
	        choice: d.key,
	        value: d.total    
	    }
	})
	//need the anchor aka d.name
	//choice is the node
	//value is the value

	console.log("node_data", node_data)

  //set up graph in same style as original example but empty
  var graph = {"nodes" : [], "links" : []};

    data.forEach(function (d) {
      graph.nodes.push({ "name": d.name });
      graph.nodes.push({ "name": d.graphicdesign});

      graph.links.push({ "source": d.name,
                         "target": d.graphicdesign,
                         "value": 1 });

     });

     // return only the distinct / unique nodes
     graph.nodes = d3.keys(d3.nest()
       .key(function (d) { return d.name; })
       .map(graph.nodes));

     // loop through each link replacing the text with its index from node
     graph.links.forEach(function (d, i) {
       graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
       graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
     });

     //now loop through each nodes to make nodes an array of objects
     // rather than an array of strings
     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });

console.log("graph", graph);

  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
 
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", 5)
      .sort(function(a, b) { return b.dy - a.dy; });

// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
		  return "translate(" + (d.x) + "," + d.y + ")"; })


// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", 2)
      .style("fill", "#92a2ce")
      .style("stroke", "#92a2ce")
    	.append("title")
      .text(function(d) { 
		    return d.name + "\n" + d.value; });
 
// add in the title for the nodes
  node.append("text")
      .attr("x", 10)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .style("font-size", function(d){
        return d.total
      })
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .style("font-size", "9px")
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", -20)
      .attr("text-anchor", "start");

console.log("new", data)


  };


  var setData = function (sheet) {
    spreadsheetData = sheet;



    drawGraph(spreadsheetData);
  };



  $(document).ready(function () {
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
  });
};

setupSurvey();
