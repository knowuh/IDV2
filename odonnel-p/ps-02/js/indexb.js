var canvas = document.getElementById("canvas").getContext("2d");

//randQuad draws a random quadrilateral with center at (xC,yC) who's area does not extend outside of square d x d
//4. add different sizes & shapes of triangles
var randomQuad = function(xC, yC, diameter) {
    
    //random variables to (1) is in top half of bounding square, (2) is in bottom left quadrant, (3) is in bottom right quadrant
    var x1 = Math.random()*(diameter/2)-(diameter/2),   //-20 to 0
        y1 = Math.random()*(diameter/2)-(diameter/2),   //-20 to 0
        x2 = Math.random()*(diameter/2)-(diameter/2),   //-20 to 0
        y2 = Math.random()*(diameter/2),                //0 to 20
        x3 = Math.random()*(diameter/2),                //0 to 20
        y3 = Math.random()*(diameter/2),                //0 to 20
        x4 = Math.random()*(diameter/2),                //0 to 20
        y4 = Math.random()*(diameter/2)-(diameter/2);   //-20 to 0
    
    //points
    var tLeftPoint = [x1, y1], 
        bLeftPoint = [x2, y2], 
        bRightPoint = [x3, y3],
        tRightPoint = [x4, y4];
    
    //draw triangle with extra side to see pointy corners
    canvas.moveTo(xC+tLeftPoint[0], yC+tLeftPoint[1]);
    canvas.lineTo(xC+bLeftPoint[0],yC+bLeftPoint[1]);
    canvas.lineTo(xC+bRightPoint[0], yC+bRightPoint[1]);
    canvas.lineTo(xC+tRightPoint[0], yC+tRightPoint[1]);
    canvas.lineTo(xC+tLeftPoint[0], yC+tLeftPoint[1]);
    canvas.lineTo(xC+bLeftPoint[0],yC+bLeftPoint[1]);
    canvas.stroke();
};

canvas.strokeStyle = "#302b13";
canvas.lineWidth = 2;


var x = 20, y = 20, d = 40, count=0;

//1. Draw quads in a 15x15 grid
//2. Draw quads ~56% of instances
//3. only draw 100 quads then stop
for(var j = 0; j < 15; j++) {
    for (var index = 0; index < 15;  index++) {
        
        if (count < 100) {
            if (Math.random() > .44){
                randomQuad(x,y,d);
                count++;
                console.log(count+".("+x+","+y+")");
            }
        }
        x = x + d;
        
    }
    
    y = y + d;
    x = 20;
    
};