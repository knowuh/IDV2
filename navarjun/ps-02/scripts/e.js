var numberOfPolygons = 200
var maxRadius = 100
var maxDistance = Math.sqrt( (canvas.width/2)*(canvas.width/2) + (canvas.height/2)*(canvas.height/2) )
    
var ctx = canvas.getContext('2d')
ctx.clearRect(0, 0, canvas.width, canvas.height);

for (var i = 0; i < numberOfPolygons; i++) {
    var x = Math.random() * parseFloat(canvas.width)
    var y = Math.random() * parseFloat(canvas.height)
    
    var midX = canvas.width/2
    var midY = canvas.height/2
    var a = x - midX
    var b = y - midY
    var distance = Math.sqrt( a*a + b*b );
    
    var radius = (distance/maxDistance)*100
    var red = (radius/maxRadius) * 255
    var fillColor = 'rgba('+Math.floor(red)+','+0+','+0+','+(maxRadius-radius)/radius+')'
    
    var polygon = Polygon().numberOfSides(4)
                            .radius(radius)
                            .x(x).y(y)
                            .rotation(Math.random() * 360)
                            .strokeWidth(0)
                            .fillColor(fillColor)

    polygon(canvas)
}