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
	var m = {t:10,r:10,b:10,l:160},
	    w = $('#survey1').width() - m.l - m.r,
	    h = $('#survey1').height() - m.t - m.b;
	var svg = d3.select('#survey1')
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
  //set up graph in same style as original example but empty
  var graph = {"nodes" : [], "links" : []};
    data.forEach(function (d) {
      graph.nodes.push({ "name": d.name });
      graph.nodes.push({ "name": d.criticalcommunication});
      graph.links.push({ "source": d.name,
                         "target": d.criticalcommunication,
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
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
 
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link Communication")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
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
    	.append("title")
      .text(function(d) { 
		    return d.name + "\n" + d.value; });
// add in the title for the nodes
  node.append("text")
      .attr("x", 10)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", -20)
      .attr("text-anchor", "end");
  };


/////////////////////////////
  var drawGraph2 = function (data) {
  var m = {t:10,r:10,b:10,l:160},
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
     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
      .enter().append("path")
      .attr("class", "link GraphicDesign")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max( 1, d.dy); })
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
      .append("title")
      .text(function(d) { 
        return d.name + "\n" + d.value; });
 
// add in the title for the nodes
  node.append("text")
      .attr("x", 10)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", -20)
      .attr("text-anchor", "end");

  };

/////////////////////////////
  var drawGraph3 = function (data) {
  var m = {t:10,r:10,b:10,l:160},
      w = $('#survey3').width() - m.l - m.r,
      h = $('#survey3').height() - m.t - m.b;

  var svg = d3.select('#survey3')
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
  //set up graph in same style as original example but empty
  var graph = {"nodes" : [], "links" : []};
    data.forEach(function (d) {
      graph.nodes.push({ "name": d.name });
      graph.nodes.push({ "name": d.howlongdidittakeyoutogethere});

      graph.links.push({ "source": d.name,
                         "target": d.howlongdidittakeyoutogethere,
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

     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });

  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
      .enter().append("path")
      .attr("class", "link TravelTime")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
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
      .append("title")
      .text(function(d) { 
        return d.name + "\n" + d.value; });
// add in the title for the nodes
  node.append("text")
      .attr("x", 10)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", -20)
      .attr("text-anchor", "end");
  };

/////////////////////////////
  var drawGraph4 = function (data) {
  var m = {t:10,r:10,b:10,l:160},
      w = $('#survey4').width() - m.l - m.r,
      h = $('#survey4').height() - m.t - m.b;

  var svg = d3.select('#survey4')
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
  //set up graph in same style as original example but empty
  var graph = {"nodes" : [], "links" : []};
    data.forEach(function (d) {
      graph.nodes.push({ "name": d.name });
      graph.nodes.push({ "name": d.howmanyhoursperweekcanyoudevotetothisclass});

      graph.links.push({ "source": d.name,
                         "target": d.howmanyhoursperweekcanyoudevotetothisclass,
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

     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });

  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
      .enter().append("path")
      .attr("class", "link Hours")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
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
      .append("title")
      .text(function(d) { 
        return d.name + "\n" + d.value; });
// add in the title for the nodes
  node.append("text")
      .attr("x", 10)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", -20)
      .attr("text-anchor", "end");
  };
/////////////////////////////
  var drawGraph5 = function (data) {
  var m = {t:10,r:10,b:10,l:160},
      w = $('#survey5').width() - m.l - m.r,
      h = $('#survey5').height() - m.t - m.b;

  var svg = d3.select('#survey5')
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
  //set up graph in same style as original example but empty
  var graph = {"nodes" : [], "links" : []};
    data.forEach(function (d) {
      graph.nodes.push({ "name": d.name });
      graph.nodes.push({ "name": d.howmuchsleepdidyougetlastnight});

      graph.links.push({ "source": d.name,
                         "target": d.howmuchsleepdidyougetlastnight,
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

     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });

  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
      .enter().append("path")
      .attr("class", "link Sleep")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
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
      .append("title")
      .text(function(d) { 
        return d.name + "\n" + d.value; });
// add in the title for the nodes
  node.append("text")
      .attr("x", 10)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", -20)
      .attr("text-anchor", "end");
  };


/////////////////////////////
  var drawGraph6 = function (data) {
  var m = {t:10,r:10,b:10,l:160},
      w = $('#survey6').width() - m.l - m.r,
      h = $('#survey6').height() - m.t - m.b;

  var svg = d3.select('#survey6')
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
  //set up graph in same style as original example but empty
  var graph = {"nodes" : [], "links" : []};
    data.forEach(function (d) {
      graph.nodes.push({ "name": d.name });
      graph.nodes.push({ "name": d.howtallareyou});

      graph.links.push({ "source": d.name,
                         "target": d.howtallareyou,
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

     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });

  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
      .enter().append("path")
      .attr("class", "link Height")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
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
      .append("title")
      .text(function(d) { 
        return d.name + "\n" + d.value; });
// add in the title for the nodes
  node.append("text")
      .attr("x", 10)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", -20)
      .attr("text-anchor", "end");
  };
  //////////////////////////////////////////////////////////////

  var drawGraph7 = function (data) {
  var m = {t:10,r:10,b:10,l:160},
      w = $('#survey7').width() - m.l - m.r,
      h = $('#survey7').height() - m.t - m.b;
  var svg = d3.select('#survey7')
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
  //set up graph in same style as original example but empty
  var graph = {"nodes" : [], "links" : []};
    data.forEach(function (d) {
      graph.nodes.push({ "name": d.name });
      graph.nodes.push({ "name": d.javascriptwebdevelopment});
      graph.links.push({ "source": d.name,
                         "target": d.javascriptwebdevelopment,
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
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
 
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link Software")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
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
      .append("title")
      .text(function(d) { 
        return d.name + "\n" + d.value; });
// add in the title for the nodes
  node.append("text")
      .attr("x", 10)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", -20)
      .attr("text-anchor", "end");
  };

  /////////////////////////////////////////////////////

  var drawGraph8 = function (data) {
  var m = {t:10,r:10,b:10,l:160},
      w = $('#survey8').width() - m.l - m.r,
      h = $('#survey8').height() - m.t - m.b;
  var svg = d3.select('#survey8')
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
  //set up graph in same style as original example but empty
  var graph = {"nodes" : [], "links" : []};
    data.forEach(function (d) {
      graph.nodes.push({ "name": d.name });
      graph.nodes.push({ "name": d.whenwasthelasttimeyoudrewapicture});
      graph.links.push({ "source": d.name,
                         "target": d.whenwasthelasttimeyoudrewapicture,
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
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
 
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link Drew")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
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
      .append("title")
      .text(function(d) { 
        return d.name + "\n" + d.value; });
// add in the title for the nodes
  node.append("text")
      .attr("x", 10)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", -20)
      .attr("text-anchor", "end");
  };

  /////////////////////////////////////////////////////

  var drawGraph9 = function (data) {
  var m = {t:10,r:10,b:10,l:160},
      w = $('#survey9').width() - m.l - m.r,
      h = $('#survey9').height() - m.t - m.b;
  var svg = d3.select('#survey9')
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
  //set up graph in same style as original example but empty
  var graph = {"nodes" : [], "links" : []};
    data.forEach(function (d) {
      graph.nodes.push({ "name": d.name });
      graph.nodes.push({ "name": d.whenwasthelasttimeyouwenttothebeach});
      graph.links.push({ "source": d.name,
                         "target": d.whenwasthelasttimeyouwenttothebeach,
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
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
 
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link Beach")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
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
      .append("title")
      .text(function(d) { 
        return d.name + "\n" + d.value; });
// add in the title for the nodes
  node.append("text")
      .attr("x", 10)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", -20)
      .attr("text-anchor", "end");
  };
  /////////////////////////////////////////////////////

  var drawGraph10 = function (data) {
  var m = {t:10,r:10,b:10,l:160},
      w = $('#survey10').width() - m.l - m.r,
      h = $('#survey10').height() - m.t - m.b;
  var svg = d3.select('#survey10')
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
  //set up graph in same style as original example but empty
  var graph = {"nodes" : [], "links" : []};
    data.forEach(function (d) {
      graph.nodes.push({ "name": d.name });
      graph.nodes.push({ "name": d.whenwasthelasttimeyouwenttothemfa});
      graph.links.push({ "source": d.name,
                         "target": d.whenwasthelasttimeyouwenttothemfa,
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
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
 
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link MFA")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
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
      .attr("width", 1)
      .append("title")
      .text(function(d) { 
        return d.name + "\n" + d.value; });
// add in the title for the nodes
  node.append("text")
      .attr("x", 10)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", -20)
      .attr("text-anchor", "end");
  };













  var setData = function (sheet) {
    spreadsheetData = sheet;
    drawGraph10(spreadsheetData);
    drawGraph9(spreadsheetData);
    drawGraph8(spreadsheetData);
    drawGraph7(spreadsheetData);
    drawGraph6(spreadsheetData);
    drawGraph5(spreadsheetData);
    drawGraph4(spreadsheetData);
    drawGraph3(spreadsheetData);
    drawGraph2(spreadsheetData);
    drawGraph(spreadsheetData);
  };


  $(document).ready(function () {
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", setData);
  });
};

setupSurvey();
