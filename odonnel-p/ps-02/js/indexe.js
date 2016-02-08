var canvas = document.getElementById("canvas").getContext("2d");

//30-Ecke draws 30 connected line segments in 30px by 30px squares all but 30 times


//1. dataGather function
var  dataGather = function(range){
    
    //1b. run point generator
    for (var j = 0; j<(13*144*2); j++){
        
        var x1=0, y1=0, x2=0, y2=0, x3=0, y3=0, x4=0, y4=0;

        for (var i = 0; i < 5; i++){

            //need a negative number
            if (x1+y1>=0){
                x1 = Math.random()*(range)-(range/2),   //finds (x,y) upper left half of bounding box
                y1 = Math.random()*(range)-(range/2);
                //console.log("("+x1+","+y1+") "+(x1+y1));
            };
        };

        for (var i = 0; i < 5; i++){

            //need a positive number
            if (x2-y2<=0) {
                x2 = Math.random()*(range)-(range/2),   //finds (x,y) bottom left half of bounding box
                y2 = Math.random()*(range)-(range/2);
                //console.log("("+x2+","+y2+") "+(x2+y2));
            };
        };
        
        for (var i = 0; i < 5; i++){

            //need a negative number
            if (x3-y3>=0){
                x3 = Math.random()*(range)-(range/2),   //finds (x,y) bottom right half of bounding box
                y3 = Math.random()*(range)-(range/2);
                //console.log("("+x1+","+y1+") "+(x1+y1));
            };
        };

        for (var i = 0; i < 5; i++){

            //need a positive number
            if (x4+y4<=0) {
                x4 = Math.random()*(range)-(range/2),   //finds (x,y) upper left half of bounding box
                y4 = Math.random()*(range)-(range/2);
                //console.log("("+x2+","+y2+") "+(x2+y2));
            };
        };
        
        //points in array form
        var pairPoints = [x1,y1,x2,y2,x3,y3,x4,y4];
        //console.log(pairPoints);
        
        
            var concatPoints = pairPoints.concat(concatPoints);
        
        //console.log(concatPoints);
    };
    
    concatPoints.pop();
    //console.log(concatPoints);
    console.log(concatPoints.length);
    //console.log(26*144);
    //this array contains 29925 numbers between 0 and range
    return concatPoints;
};


canvas.strokeStyle = "#302b13";
canvas.lineWidth = .75;

var x = 15, y = 15, d = 30, count=0, iteration=0;

var points = dataGather(d);

for(var j = 0; j < 600/d; j++) {
    for (var i = 0; i < 600/d;  i++) {
        
        var rand = Math.random()
        if (rand > .095 || iteration >= count+30) {
            //if (iteration <= count+12){
                //canvas.lineWidth = .1*j*i/15+.1;
                //console.log(.1*j*i/15+.1);
                    canvas.moveTo(x+points[count*(d+2)],y+points[count*(d+2)+1]);
                    canvas.lineTo(x+points[count*(d+2)+2],y+points[count*(d+2)+3]);
                    canvas.lineTo(x+points[count*(d+2)+4],y+points[count*(d+2)+5]);
                    canvas.lineTo(x+points[count*(d+2)+6],y+points[count*(d+2)+7]);
                    canvas.lineTo(x+points[count*(d+2)+8],y+points[count*(d+2)+9]);
                    canvas.lineTo(x+points[count*(d+2)+10],y+points[count*(d+2)+11]);
                    canvas.lineTo(x+points[count*(d+2)+12],y+points[count*(d+2)+13]);
                    canvas.lineTo(x+points[count*(d+2)+14],y+points[count*(d+2)+15]);
                    canvas.lineTo(x+points[count*(d+2)+16],y+points[count*(d+2)+17]);
                    canvas.lineTo(x+points[count*(d+2)+18],y+points[count*(d+2)+19]);
                    canvas.lineTo(x+points[count*(d+2)+20],y+points[count*(d+2)+21]);
                    canvas.lineTo(x+points[count*(d+2)+22],y+points[count*(d+2)+23]);
                    canvas.lineTo(x+points[count*(d+2)+24],y+points[count*(d+2)+25]);
                    canvas.lineTo(x+points[count*(d+2)+26],y+points[count*(d+2)+27]);
                    canvas.lineTo(x+points[count*(d+2)+28],y+points[count*(d+2)+29]);
                    canvas.lineTo(x+points[count*(d+2)+30],y+points[count*(d+2)+31]);
                    canvas.lineTo(x+points[count*(d+2)+32],y+points[count*(d+2)+33]);
                    canvas.lineTo(x+points[count*(d+2)+34],y+points[count*(d+2)+35]);
                    canvas.lineTo(x+points[count*(d+2)+36],y+points[count*(d+2)+37]);
                    canvas.lineTo(x+points[count*(d+2)+38],y+points[count*(d+2)+39]);
                    canvas.lineTo(x+points[count*(d+2)+40],y+points[count*(d+2)+41]);
                    canvas.lineTo(x+points[count*(d+2)+42],y+points[count*(d+2)+43]);
                    canvas.lineTo(x+points[count*(d+2)+44],y+points[count*(d+2)+45]);
                    canvas.lineTo(x+points[count*(d+2)+46],y+points[count*(d+2)+47]);
                    canvas.lineTo(x+points[count*(d+2)+48],y+points[count*(d+2)+49]);
                    canvas.lineTo(x+points[count*(d+2)+50],y+points[count*(d+2)+51]);
                    canvas.lineTo(x+points[count*(d+2)+52],y+points[count*(d+2)+53]);
                    canvas.lineTo(x+points[count*(d+2)+54],y+points[count*(d+2)+55]);
                    canvas.lineTo(x+points[count*(d+2)+56],y+points[count*(d+2)+57]);
                    canvas.lineTo(x+points[count*(d+2)+58],y+points[count*(d+2)+59]);
                    canvas.lineTo(x+points[count*(d+2)+60],y+points[count*(d+2)+61]);
                   
                //canvas.stroke();
                count++;
                
            //}
                
            }
            
        
        iteration++;
        x = x + d;
        
    }
    
    y = y + d;
    x = d/2;
    console.log(iteration);
};

canvas.stroke();
//console.log('it ran');

