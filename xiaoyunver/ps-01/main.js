(function (){
    alert('test');
})()

var c=document.getElementById("canvas");
var circle=c.getContext('2d');
circle.beginPath();
circle.arc(50,50,50,0,2*Math.PI);
circle.fillStyle="#CFACDB";
circle.fill();

circle.beginPath();
circle.arc(152,50,50,0,2*Math.PI);
circle.fillStyle="#DBA0C0";
circle.fill();

circle.beginPath();
circle.arc(254,50,50,0,2*Math.PI);
circle.fillStyle="#AEB9DB";
circle.fill();