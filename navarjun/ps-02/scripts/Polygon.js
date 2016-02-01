var Polygon = function() {
    // Default values
    var numberOfSides = 3,
        radius = 5, x = 0, y = 0,
        strokeWidth = 15,
        strokeColor = 'rgb(10, 10, 10)',
        fillColor = 'rgb(20, 20, 20)',
        rotation = 0 // in degrees
    
    var cos = Math.cos, sin = Math.sin
    var degToRad = function(angleInDegrees) {
         // Degrees to radian conversion
        return angleInDegrees * (Math.PI/180)
    }
    
    var draw = function(canvasElement) {
        var angleIncrements = 360.0/numberOfSides
        angleIncrements = degToRad(angleIncrements)
        var pointsArray = []
        
        // calculating points for a polygon
        for (var i = 0; i < numberOfSides; i++) {
            var xPos = x + radius * cos(angleIncrements*i)
            var yPos = y + radius * sin(angleIncrements*i)
            pointsArray.push({x: xPos, y: yPos})
        }
        
        // applying rotation to the points with respect to center
        for (var i = 0; i < numberOfSides; i++) {
            var xPos = pointsArray[i].x,
                yPos = pointsArray[i].y,
                radians = degToRad(rotation)
            xPos -= x; yPos -= y    // changing the anchorpoint to origin
            var newXPos = cos(radians) * xPos - sin(radians) * yPos
            var newYPos = sin(radians) * xPos + cos(radians) * yPos
            newXPos += x; newYPos += y  // changing anchorpoint back to center point
            pointsArray[i] = {x: newXPos, y: newYPos}
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
    
    draw.rotation = function(r) {
        if (typeof r === 'undefined') {
            return rotation
        }
        rotation = r
        return this
    }
    
    return draw
}