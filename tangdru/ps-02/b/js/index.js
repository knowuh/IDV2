var ctx = document.getElementById("canvas").getContext("2d");



var ctx = document.getElementById("canvas").getContext("2d");



var drawPoly = function(){
    
var x = (Math.random()*750),
    y = (Math.random()*750),
    sz = (Math.random()*100),
    rt = (Math.random()*(Math.random()*.05)),    
    
    r= (Math.floor()*250),
    g= (Math.floor()*250),
    b= (Math.floor()*250),
    a= (Math.floor()*250),
    
    numberOfSides = 6,
    size = sz,
    Xcenter = x,
    Ycenter = y;

ctx.beginPath();
ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

for (var i = 1; i <= numberOfSides;i += 1) {
    ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
}
 
//ctx.fill();    
//ctx.fillStyle = "rgba(r,g,b,a)";
ctx.strokeStyle = "#000000";
ctx.lineWidth = 1;
ctx.stroke();
//ctx.rotate(rt);    
    
};


for (var i=0; i<100; i++){
drawPoly();
};





    
//draw polygon
//var poly=[ 5,5, 100,5, 100,100, 5,100 ];
//ctx.fillStyle = '#f00';
//
//ctx.beginPath();
//ctx.moveTo(poly[0], poly[1]);
//for( item=2 ; item < poly.length-1 ; item+=2 ){ctx.lineTo( poly[item] , poly[item+1] )}
//
//ctx.closePath();
//ctx.fill();




//draw hexagon
//var numberOfSides = 6,
//    size = 20,
//    Xcenter = 25,
//    Ycenter = 25;
//
//ctx.beginPath();
//ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          
//
//for (var i = 1; i <= numberOfSides;i += 1) {
//    ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
//}
//
//ctx.strokeStyle = "#000000";
//ctx.lineWidth = 1;
//ctx.stroke();



//example from class
//var fillTriangle = function(xCenterOfTriangle, yCenterOfTriangle, diameter) {
//    var radius = diameter/2;
//    var topOfTriangle = yCenterOfTriangle - (radius);
//    var bottomOfTriangle = topOfTriangle  +  (radius);
//    var left = xCenterOfTriangle - (radius);
//    var right = xCenterOfTriangle + (radius);
//    canvas.moveTo(xCenterOfTriangle,topOfTriangle);
//    canvas.lineTo(right, bottomOfTriangle);
//    canvas.lineTo(left, bottomOfTriangle);
//    canvas.fill();
//};
//canvas.fillStyle = "#000000";
//
//
//var triangles = [50, 100, 150, 200];
//
//for (var index = 0; index <100;  index++) {
//  var triangleY = triangles[index];
//  fillTriangle(50, triangleY, 30);  
//  console.log(index);
//  console.log(triangleY);
//}
//
