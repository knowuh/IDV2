"use strict";

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
    data.push({maker: maker, camera: cameraString, rawCameraName: camera, count: count});
  }
  data.sort(function(a, b) {
    return parseInt(b.count) - parseInt(a.count);
  });
  // to remove 'null' cameras
  data = data.filter(function(d) { return d.camera; }).slice(0, limit);
  return data;
}

function getTopLensesForCamera(cameraData, camera, limit = 10) {
  var workableData = cameraData.filter(function(d) { return d.camera ? d.camera.toLowerCase() === camera.toLowerCase() : false; });
  var lenses = new Set(workableData.map(function(element) {
    return element.lens;
  }));

  var it = lenses.values();
  var data = [];
  for (let lens of it) {
    if (!lens) continue;
    var count = workableData.reduce(function(p, d) { return d.lens === lens ? p+1 : p; }, 0);
    var cameraString = lens.toLowerCase();
    data.push({lens: lens, count: count});
  }
  data.sort(function(a, b) {
    return parseInt(b.count) - parseInt(a.count);
  });
  data = data.filter(function(d) { return d.lens; }).slice(0, limit);
  return data;
}
