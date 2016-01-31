var numberOfPolygons = 100

var ctx = canvas.getContext('2d')
ctx.clearRect(0, 0, canvas.width, canvas.height);

for (var i = 0; i < numberOfPolygons; i++) {
    var x = Math.random() * parseFloat(canvas.width)
    var y = Math.random() * parseFloat(canvas.height)
    var fillColor = 'rgba('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.random()+')'

    var polygon = Polygon().numberOfSides(4)
                            .radius(Math.random() * 50 + 10)
                            .x(x).y(y)
                            .rotation(Math.random() * 360)
                            .strokeWidth(0)
                            .fillColor(fillColor)

    polygon(canvas)
}