"use strict";

let margin = {l: 0, r: 50, t: 50, b: 50}
let w = d3.select(".container").node().offsetWidth - margin.l - margin.r;
let h = window.innerHeight - margin.t - margin.b - 40;
var masterData = [];
var xAxis = d3.svg.axis();
let limit = 10;
let svg = d3.select(".plot")

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
  var data = getTopCameras(cameraData, limit);
  var scaleX = d3.scale.ordinal().domain(data.map(function(d) { return d.camera; })).rangePoints([margin.l, w-margin.r]);
  var scaleY = d3.scale.linear().domain([0, d3.max(data, function(d) { return d.count; })]).range([margin.t, h]);

  xAxis = d3.svg.axis()
                .scale(scaleX)
                .orient("bottom");

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

  var cameraChart = svg.append("g");

  var cameraChartBars = cameraChart.selectAll("rect")
    .data(data)
    .enter()
    .append("rect");

  cameraChartBars.classed("cameraBar", true)
    .classed("canonBar", function(d) { return d.maker === "Canon"; })
    .classed("nikonBar", function(d) { return d.maker === "Nikon"; })
    .attr("x", function(d, i) { return scaleX(d.camera); })
    .attr("y", function(d) { return h+margin.t; })
    .attr("width", function(d) { return w/data.length - 2; })
    .attr("height", function(d) { return 0; })
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  cameraChartBars.on("click", function(d, i) {
    var lensData = getTopLensesForCamera(masterData, d.rawCameraName, limit);
    setTimeout(drawChartForLens, 0, cameraChart, lensData, tip);
  });

  cameraChartBars.transition()
    .delay(function(_, i) { return 100 * i; })
    .attr("y", function(d) { return h+margin.t-scaleY(d.count); })
    .attr("height", function(d) { return scaleY(d.count); });
}


function drawChartForLens(cameraChart, data, tip) {
  var scaleX = d3.scale.ordinal().domain(data.map(function(d) { return d.lens; })).rangePoints([margin.l, w-margin.r]);
  var scaleY = d3.scale.linear().domain([0, d3.max(data, function(d) { return d.count; })]).range([margin.t, h]);
  var x = 1;
  cameraChart.selectAll("rect")
    .transition()
    .delay(function(_, i) { return 100 * i; })
    .attr("y", function(d) { return h+margin.t; })
    .attr("height", function(d) { return 0; })
    .each("end", function(d, i) {
      if (i == 9) {
        var scaleX = d3.scale.ordinal().domain(data.map(function(d) { return d.lens; })).rangePoints([margin.l, w-margin.r]);
        var scaleY = d3.scale.linear().domain([0, d3.max(data, function(d) { return d.count; })]).range([margin.t, h]);
        console.log(data);
        xAxis.scale(scaleX);
        d3.select(".xaxis").remove();
        svg.append("g")
            .classed("xaxis", true)
            .classed("cameraXAxis", true)
            .attr("transform", "translate("+(w/data.length)/2+","+(h+margin.t)+")")
            .call(xAxis);

        var cameraChartBars = cameraChart.selectAll("rect").remove();
        cameraChartBars = cameraChart.selectAll("rect")
          .data(data).enter()
          .append("rect");

        cameraChartBars.classed("cameraBar", true)
          .classed("canonBar", function(d) { return true; })
          .classed("nikonBar", function(d) { return false; })
          .attr("x", function(d, i) { return scaleX(d.lens); })
          .attr("y", function(d) { return h+margin.t; })
          .attr("width", function(d) { return w/data.length - 2; })
          .attr("height", function(d) { return 0; })
          .on("mouseover", tip.show)
          .on("mouseout", tip.hide);

        tip.html(function(d) {
          return "<div>"+d.lens+"</div><div>"+d.count+"</div>";
        });
        cameraChartBars.transition()
          .delay(function(_, i) { return 100 * i; })
          .attr("y", function(d) { return h+margin.t-scaleY(d.count); })
          .attr("height", function(d) { return scaleY(d.count); });
      }
    })
}
