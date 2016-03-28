var canvas = document.getElementById("canvas").getContext("2d");

//randTri draws a random triangle with center at (xC,yC) who's area does not extend outside of square d x d
//4. add different sizes & shapes of triangles
var randomTri = function(xC, yC, diameter) {
    
    //random variables to (1) is in top half of bounding square, (2) is in bottom left quadrant, (3) is in bottom right quadrant
    var x1 = Math.random()*diameter-(diameter/2),       //-50 to 50
        y1 = Math.random()*(diameter/2)-(diameter/2),   //-50 to 0
        x2 = Math.random()*(diameter/2)-(diameter/2),   //-50 to 0
        y2 = Math.random()*(diameter/2),                //0 to 50
        x3 = Math.random()*(diameter/2),                //0 to 50
        y3 = Math.random()*(diameter/2);                //0 to 50
    
    //points
    var topPoint = [x1, y1], 
        leftPoint = [x2, y2], 
        rightPoint = [x3, y3];
    
    //draw triangle with extra side to see pointy corners
    canvas.moveTo(xC+topPoint[0], yC+topPoint[1]);
    canvas.lineTo(xC+leftPoint[0],yC+leftPoint[1]);
    canvas.lineTo(xC+rightPoint[0], yC+rightPoint[1]);
    canvas.lineTo(xC+topPoint[0], yC+topPoint[1]);
    canvas.lineTo(xC+leftPoint[0],yC+leftPoint[1]);
    canvas.stroke();
};

canvas.strokeStyle = "#302b13";
canvas.lineCap="round";
canvas.lineWidth = 3;


var x = 50, y = 50, d = 100, count=0;

//1. Draw triangles in a 6x6 grid
//2. Draw triangles ~45% of instances
//3. only draw 10 triangles then stop
for(var j = 0; j < 6; j++) {
    for (var index = 0; index < 6;  index++) {
        
        if (count < 10) {
            if (Math.random() > .55){
                randomTri(x,y,d);
                count++;
                console.log(count+".("+x+","+y+")");
            }
        }
        x = x + d;
        
    }
    
    y = y + d;
    x = 50;
    
};