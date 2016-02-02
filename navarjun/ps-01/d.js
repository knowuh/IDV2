
var canvas = document.getElementById("canvas")
var context = canvas.getContext('2d')

for (var i = 0; i < 3; i++) {
  var cd = i%3 //decides color of the circle
  var r = (cd == 0) ? 200 : 0,
      g = (cd == 1) ? 200 : 0,
      b = (cd == 2) ? 200 : 0
  createCircle(50+(i*100), 50, 40, "rgb("+r+", "+g+", "+b+")")
}

function createCircle(centerX, centerY, radius, color) {
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
  context.fillStyle = color
  context.fill()
}
