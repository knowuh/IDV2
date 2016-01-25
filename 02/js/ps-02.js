var drawTriangle = function (centerX, centerY, diameter) {
  var radius = diameter / 2;
  var apex = [centerY + radius];
  var bottomLeft =
};

var drawCanvas = function () {
  var canvas = $("#canvas").getContext(); // TOOD: lookup call.

};

$(document).ready(drawCanvas);