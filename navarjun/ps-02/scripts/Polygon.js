var Polygon = function() {
    // Default values
    var numberOfSides = 3,
        radius = 5, x = 0, y = 0,
        strokeWidth = 15,
        strokeColor = 'rgb(10, 10, 10)',
        fillColor = 'rgb(20, 20, 20)'
    
    var draw = function(canvasElement) {
        var angleIncrements = 360.0/numberOfSides
        angleIncrements = angleIncrements * (Math.PI/180) //Degrees to radian conversion
        var pointsArray = []
        
        // calculating points for a polygon
        for (var i = 0; i < numberOfSides; i++) {
            var xPos = x + radius*Math.cos(angleIncrements*i)
            var yPos = y + radius*Math.sin(angleIncrements*i)
            pointsArray.push({x: xPos, y: yPos})
        }
        
        var ctx = canvasElement.getContext('2d')
        ctx.beginPath();
        ctx.moveTo(pointsArray[0].x,pointsArray[0].y);
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle=strokeColor
        for (var i = 1; i < numberOfSides; i++) {
            // drawing a line from one point to the next
            ctx.lineTo(pointsArray[i].x, pointsArray[i].y);
        }
        ctx.closePath()
        if (strokeWidth != 0) {
            ctx.stroke()
        }
        ctx.fillStyle = fillColor
        ctx.fill()
    }
    
    // Getters and Setters
    draw.numberOfSides = function(sides) {
        if (typeof sides === 'undefined') {
            return numberOfSides
        }
        numberOfSides = sides
        return this
    }
    
    draw.radius = function(r) {
        if (typeof r === 'undefined') {
            return radius
        }
        radius = r
        return this
    }
    
    draw.x = function(xPos) {
        if (typeof xPos === 'undefined') {
            return x
        }
        x = xPos
        return this
    }
    
    draw.y = function(yPos) {
        if (typeof yPos === 'undefined') {
            return y
        }
        y = yPos
        return this
    }
    
    draw.strokeWidth = function(width) {
        if (typeof width === 'undefined') {
            return strokeWidth
        }
        strokeWidth = width
        return this
    }
    
    draw.strokeColor = function(color) {
        if (typeof color === 'undefined') {
            return strokeColor
        }
        strokeColor = color
        return this
    }
    
    draw.fillColor = function(color) {
        if (typeof color === 'undefined') {
            return fillColor
        }
        fillColor = color
        return this
    }
    
    return draw
}