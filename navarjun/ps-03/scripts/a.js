var drawLineOnCanvas = function(canvas, point1, point2) {
  var ctx = canvas.getContext('2d')
  ctx.moveTo(point1.x,point1.y)
  ctx.lineWidth = 1
  ctx.lineTo(point2.x, point2.y)
  ctx.strokeStyle="#000000"
  ctx.stroke()
}
//
var cos = Math.cos, sin = Math.sin
var degToRad = function(angleInDegrees) {
     // Degrees to radian conversion
    return angleInDegrees * (Math.PI/180)
}

loadSpreadsheet("", function(data) {
  var numberOfElements = data.length,
      angleDifference = 360/numberOfElements,
      startAngle = 0,
      scaleFactor = Math.min(canvas.width/21, canvas.height/21),
      centerPoint = {x: canvas.width/2.0, y: canvas.height/2.0}

  var circle = Polygon().numberOfSides(30).strokeWidth(0).fillColor('green').strokeColor('rgba(0,0,0,0)')
  var rect = Polygon().numberOfSides(4).strokeWidth(0).fillColor('#EE0000').strokeColor('rgba(0,0,0,0)')

  for (var i = 0; i < numberOfElements; i++) {
    var element = data[i],
        angle = degToRad(startAngle + i * angleDifference),
        pointPosition = { x: centerPoint.x + element.graphicdesign  * scaleFactor * cos(angle),
                        y: centerPoint.y + element.graphicdesign  * scaleFactor * sin(angle) }

    drawLineOnCanvas(canvas, centerPoint, pointPosition)
    circle.x(pointPosition.x).y(pointPosition.y)
    circle(canvas)

    pointPosition = { x: centerPoint.x + element.javascriptwebdevelopment * scaleFactor * cos(angle),
                    y: centerPoint.y + element.javascriptwebdevelopment * scaleFactor * sin(angle) }

    drawLineOnCanvas(canvas, centerPoint, pointPosition)
    rect.x(pointPosition.x).y(pointPosition.y)
    rect(canvas)
  }
})
