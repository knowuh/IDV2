var canvas = document.getElementById("canvas").getContext("2d");

var fillTriangle = function(xCenterOfTriangle, yCenterOfTriangle, diameter) {
    var radius = diameter/2;
    var topOfTriangle = yCenterOfTriangle - (radius);
    var bottomOfTriangle = topOfTriangle  +  (radius);
    var left = xCenterOfTriangle - (radius);
    var right = xCenterOfTriangle + (radius);
    canvas.moveTo(xCenterOfTriangle,topOfTriangle);
    canvas.lineTo(right, bottomOfTriangle);
    canvas.lineTo(left, bottomOfTriangle);
    canvas.fill();
};
canvas.fillStyle = "#000000";


var triangles = [50, 100, 150, 200, 250, 300];

for (var index = 0; index <6;  index++) {
  var triangleY = triangles[index];
  fillTriangle(100, triangleY, 30);  
  console.log(index);
  console.log(triangleY);
}