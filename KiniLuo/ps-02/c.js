/**
 * Created by KiniLuo on 1/31/16.
 */

var canvas = document.getElementById("canvas").getContext("2d");
var heading = document.getElementById("heading");
height = window.innerHeight-heading.clientHeight;
width = window.innerWidth;


var drawLine=function(x1,y1,x2,y2){
    canvas.moveTo(x1,y1);
    canvas.lineTo(x2,y2);
    canvas.stroke();
    canvas.lineWidth=.1;

}



var newArray=[]
var x1Random,y1Random,x2Random,y2Random;


var numberOfLines=1000
for (var i= 0;i<numberOfLines;i++){

        x1Random=Math.random()*width,
        y1Random=Math.random()*height,
        //x2Random=Math.random()*width,
        y2Random=Math.random()*height;

    var newObject={
        x1:x1Random,y1:y1Random,x2:x1Random,y2:y2Random
    }
    newArray.push(newObject);
    drawLine(newObject.x1,newObject.y1,newObject.x2,newObject.y2);

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
}
        canvas.strokeStyle=getRandomColor();
}