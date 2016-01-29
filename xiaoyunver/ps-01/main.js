
var c=document.getElementById("canvas");
var circle=c.getContext('2d');
circle.beginPath();
circle.arc(50,50,50,0,2*Math.PI);
circle.fillStyle="#000000";
circle.fill();

circle.beginPath();
circle.arc(152,50,50,0,2*Math.PI);
circle.fillStyle="#494949";
circle.fill();

circle.beginPath();
circle.arc(254,50,50,0,2*Math.PI);
circle.fillStyle="#CCCCCC";
circle.fill();