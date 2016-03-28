"use strict";

let margin = {l: 0, r: 50, t: 50, b: 50}
let w = d3.select(".container").node().offsetWidth - margin.l - margin.r;
let h = window.innerHeight - margin.t - margin.b;
var masterData = [];

d3.select(".plot")
  .attr("width", d3.select(".container").node().offsetWidth)
  .attr("height", window.innerHeight);

var baseurl = "https://api.500px.com/v1/photos?consumer_key=Qz0DzxoUenHQF9EUgjMfsRseXnrpj3TWqsZeNJCh&categories=7";

var url = baseurl + "&rpp=1000&feature=popular&only=people"
d3.json(url)
  .get(function(error, response) {
    masterData = response.photos;
    var data = response.photos.map(function(element) {
        return {
          camera: element.camera,
          lens:   element.lens
        };
    });
    setTimeout(drawChartForCameraData, 0, data);
  });

function drawChartForCameraData(cameraData) {
  var data = getTopCameras(cameraData);

  var scaleX = d3.scale.ordinal().domain(data.map(function(d) { return d.camera; })).rangePoints([margin.l, w-margin.r]);
  var scaleY = d3.scale.linear().domain([0, d3.max(data, function(d) { return d.count; })]).range([margin.t, h]);

  var xAxis = d3.svg.axis()
                .scale(scaleX)
                .orient("bottom");

  var svg = d3.select(".plot")
  var tip = d3.tip()
              .attr('class', 'cameraChartTooltip')
              .offset([30, 0])
              .html(function(d) {
                return "<div>"+d.maker+"</div><div>"+d.camera+"</div><div>"+d.count+"</div>";
              });

  svg.call(tip);

  svg.append("g")
      .classed("xaxis", true)
      .classed("cameraXAxis", true)
      .attr("transform", "translate("+(w/data.length)/2+","+(h+margin.t)+")")
      .call(xAxis);

  var cameraChart = svg.append("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect").classed("cameraBar", true)
    .classed("canonBar", function(d) { return d.maker === "Canon"; })
    .classed("nikonBar", function(d) { return d.maker === "Nikon"; })
    .attr("x", function(d, i) { return scaleX(d.camera); })
    .attr("y", function(d) { return h+margin.t; })
    .attr("width", function(d) { return w/data.length - 2; })
    .attr("height", function(d) { return 0; })
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide)
    .on("click", function(d, i) {

    });

  cameraChart.transition()
    .delay(function(_, i) { return 100 * i; })
    .attr("y", function(d) { return h+margin.t-scaleY(d.count); })
    .attr("height", function(d) { return scaleY(d.count); });
}

function getTopCameras(cameraData, limit=10) {
  var cameras = new Set(cameraData.map(function(element) {
    return element.camera;
  }));
  var it = cameras.values();
  var data = [];
  for (let camera of it) {
    if (!camera) continue;
    var count = cameraData.reduce(function(p, d) { return d.camera === camera ? p+1 : p; }, 0);
    var cameraString = camera.toLowerCase();
    var maker = "";
    if (cameraString.indexOf("canon") != -1) {
      let makerIndex = cameraString.indexOf("canon")
      maker = "Canon";
      cameraString = camera.replace(camera.substring(makerIndex, 6), "");
    } else if (cameraString.indexOf("nikon") != -1) {
      let makerIndex = cameraString.indexOf("nikon");
      maker = "Nikon";
      cameraString = camera.replace(camera.substring(makerIndex, 6), "");
    }
    data.push({"maker": maker, "camera": cameraString, count: count});
  }
  data.sort(function(a, b) {
    return parseInt(b.count) - parseInt(a.count);
  });
  data = data.filter(function(d) { return d.camera; }).slice(0, limit);
  return data;
}
