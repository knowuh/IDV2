//copied from http://jsfiddle.net/nrabinowitz/5CfGG/

// largely based on http://bl.ocks.org/4063550

// some made-up data
var data = [1,3,2,5,3,2,7,1];


//creates a child object for each element in the data array, and stores a size value in it
var dataTree = {
    children: data.map(function(d) { return { size: d }; })
};

//object with the children array inside it. Children array is an array of child objects, 
//each with a size attribute.
console.log(dataTree);


// basic settings
var w = 400,
    m = 20,
    maxRadius = 50,
    padding = 10;


// size scale for data
var radiusScale = d3.scale.sqrt()
    .domain([0, d3.max(data)])
    .range([0, maxRadius]);

// determine the appropriate radius for the circle
var roughCircumference = d3.sum(data.map(radiusScale)) * 2 +
        padding * (data.length - 1),
    radius = roughCircumference / (Math.PI * 2);

// make a radial tree layout
var tree = d3.layout.tree()
    .size([360, radius])
    .separation(function(a, b) {
        return radiusScale(a.size) + radiusScale(b.size);
    });

//returns an ugly function - nothing parseable.
//console.log(tree);


// make the svg
var svg = d3.select("body").append("svg")
    .attr("width", w + m * 2)
    .attr("height", w + m * 2)
  .append("g")
    .attr("transform", "translate(" + (w / 2 + m) + "," + (w / 2 + m) + ")");

// apply the layout to the data - creates an array of nodes,
//each with depth x, and y values.
var nodes = tree.nodes(dataTree);

console.log(nodes);

/*
// create dom elements for the node
var node = svg.selectAll(".node")
      .data(nodes.slice(1)) // cut out the root node, we don't need it
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
          return "rotate(" + (d.x - 90) + ") translate(" + d.y + ")";
      })

node.append("circle")
    .attr("r", function(d) { return radiusScale(d.size); });
*/