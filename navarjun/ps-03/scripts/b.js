var context = canvas.getContext("2d")

// Create an in memory only element of type 'custom'
var detachedContainer = document.createElement("custom")

// Create a d3 selection for the detached container. We won't
// actually be attaching it to the DOM.
var dataContainer = d3.select(detachedContainer)

function drawCustom(data) {
  var scaleX = d3.scale.ordinal()
    .domain(data)
    .rangeRoundBands([50, canvas.width-50], 0.1);

  var scaleY = d3.scale.linear()
                .range([50, canvas.height-50])
                .domain([0, data.length])

  var groups = _(data).chain()
    .groupBy(_.identity)
    .map(function (values, key) {
        return {
            freq: values.length,
            value: key
        };
    })
    .sortBy(function (d) { return d.value; })
    .value();

  var dataBinding = dataContainer.selectAll("custom.rect")
    .data(groups);

  // update existing element to have size 15 and fill green
  dataBinding
    .attr("size", 15)
    .attr("fillStyle", "green");

  // for new elements, create a 'custom' dom node, of class rect
  // with the appropriate rect attributes
  dataBinding.enter()
      .append("custom")
      .classed("rect", true)
      .attr("x", function(d) { return scaleX(d.value) })
      .attr("y", canvas.height - 50)
      .attr("width", canvas.width/Object.keys(data).length)
      .attr("height", function(d){ return scaleY(d.freq) })
      .attr("fillStyle", "rgba(170, 0, 0, 1)")
      .attr("label", function(d) { return d.value });
  // for exiting elements, change the size to 5 and make them grey.
  dataBinding.exit()
    .attr("size", 5)
    .attr("fillStyle", "lightgrey");

  drawCanvas();
}

function drawCanvas() {

  // clear canvas
  context.fillStyle = "rgba(0,0,0,0)";
  context.rect(0,0,canvas.width,canvas.height);
  context.fill();

  var elements = dataContainer.selectAll("custom.rect");
  elements.each(function(d) {
    var node = d3.select(this)

    context.beginPath()
    context.fillStyle = node.attr("fillStyle")
    context.rect(node.attr("x"), node.attr("y") - node.attr("height"), node.attr("width"), node.attr("height"))
    context.fill();
    context.closePath();

    context.font = "15px Arial";
    context.fillStyle = "rgba(170,170,170,1)";
    context.textAlign = "center";
    var width = parseFloat(node.attr("width")/2.0)
    var x = parseFloat(node.attr("x"))
    console.log(node.attr('label'));
    var label = node.attr('label')
    if (label ===" (this shouldn't be mutually exclusive) I took the train and the bus.") {
      label = "Train & Bus"
    } else if (label === "Manual transportation (walk / bike / wheelchair / roller blades)") {
      label = "Manual transportation"
    }
    context.fillText(label, x + width, parseFloat(node.attr("y"))+15);
  });
}

loadSpreadsheet("", function(data) {
  drawCustom(data.map(function(d) {
    return d.howdidyougethere
  }))
})
