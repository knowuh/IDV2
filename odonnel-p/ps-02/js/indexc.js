var canvas = document.getElementById("canvas").getContext("2d");

//lovelyLines draws 1000 random line segments, and then conncects the ending point of a line with it's nearest starting point
//Steps:
//1. Each line is make up of 4 points
//2. Concat those points in a 4000 length array
//3. Place 4 points in bounding square, then loop to the next square.
//4. Draw lines between each point (actually 1999 points)

//1. dataGather function
var  dataGather = function(range){
    
    //1b. run point generator 1000 times
    for (var j = 0; j<1000; j++){
        
        var x1=0, y1=0, x2=0, y2=0;

        //1a. Generate two random points, one in top left half of bounding box, one in top right half
        for (var i = 0; i < 6; i++){

            //need a negative number
            if (x1+y1>=0){
                x1 = Math.random()*(range)-(range/2),   //finds (x,y) upper left half of bounding box
                y1 = Math.random()*(range)-(range/2);
                //console.log("("+x1+","+y1+") "+(x1+y1));
            };
        };

        for (var i = 0; i < 6; i++){

            //need a positive number
            if (x2+y2<=0) {
                x2 = Math.random()*(range)-(range/2),   //finds (x,y) upper left half of bounding box
                y2 = Math.random()*(range)-(range/2);
                //console.log("("+x2+","+y2+") "+(x2+y2));
            };
        };

        //points in array form
        var pairPoints = [x1,y1,x2,y2];
        //console.log(pairPoints);
        
        
            var concatPoints = pairPoints.concat(concatPoints);
        
        //console.log(concatPoints);
    };
    
    concatPoints.pop();
    //console.log(concatPoints);
    //console.log(concatPoints.length);
    //this array contains 4000 numbers between 0 and range
    return concatPoints;
};



//var randomQuad = function(xC, yC, diameter) {
//    
//    //random variables to (1) is in top half of bounding square, (2) is in bottom left quadrant, (3) is in bottom right quadrant
//    var x1 = Math.random()*(diameter/2)-(diameter/2),   //-20 to 0
//        y1 = Math.random()*(diameter/2)-(diameter/2),   //-20 to 0
//        x2 = Math.random()*(diameter/2)-(diameter/2),   //-20 to 0
//        y2 = Math.random()*(diameter/2),                //0 to 20
//        x3 = Math.random()*(diameter/2),                //0 to 20
//        y3 = Math.random()*(diameter/2),                //0 to 20
//        x4 = Math.random()*(diameter/2),                //0 to 20
//        y4 = Math.random()*(diameter/2)-(diameter/2);   //-20 to 0
//    
//    //points
//    var tLeftPoint = [x1, y1], 
//        bLeftPoint = [x2, y2], 
//        bRightPoint = [x3, y3],
//        tRightPoint = [x4, y4];
//    
//    //draw triangle with extra side to see pointy corners
//    canvas.moveTo(xC+tLeftPoint[0], yC+tLeftPoint[1]);
//    canvas.lineTo(xC+bLeftPoint[0],yC+bLeftPoint[1]);
//    canvas.lineTo(xC+bRightPoint[0], yC+bRightPoint[1]);
//    canvas.lineTo(xC+tRightPoint[0], yC+tRightPoint[1]);
//    canvas.lineTo(xC+tLeftPoint[0], yC+tLeftPoint[1]);
//    canvas.lineTo(xC+bLeftPoint[0],yC+bLeftPoint[1]);
//    canvas.stroke();
//};

canvas.strokeStyle = "#302b13";
canvas.lineWidth = 2;

var x = 6, y = 6, d =12, count=0;

var points = dataGather(12);

for(var j = 0; j < 50; j++) {
    for (var i = 0; i < 50;  i++) {
        
        var rand = Math.random()
        if (rand > 0.5) {
            if (count == 0){

                canvas.moveTo(x+points[count],y+points[count+1]);
                canvas.lineTo(x+points[count+2],y+points[count+3]);
                count++;
                //console.log("first count");

            } else if (count < 1000) {

                canvas.lineTo(x+points[count*4],y+points[count*4+1]);
                canvas.lineTo(x+points[count*4+2],y+points[count*4+3]);
                count++;
                //console.log("else if count "+count);

            }
        }
        
        x = x + d;
        
    }
    
    y = y + d;
    x = d/2;
    
};

canvas.stroke();
//console.log('it ran');

